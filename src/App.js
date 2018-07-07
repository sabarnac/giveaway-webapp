import Random from "random-js";
import { requestTimeout, requestInterval, clearRequestInterval } from "./custom.js";

/**
 * Class that acts as our primary application.
 */
export default class App {

    /**
     * Constructs the application by setting class properties, and properly binding class methods.
     * 
     * @param {object} config The application configuration.
     * @param {array} users The list of users among which the TOURNAMENT ARC will occur.
     * @param {HTMLElement} div The HTML element to attach the application too.
     */
    constructor(config, users, div) {
        //Setup dependencues
        this._config = config;
        this._div = div;
        this._wrapper = this._div.querySelector(".wrapper");
        this._random_engine = Random.engines.mt19937();
        //Seed the generator with the config value so that everything is repeatable.
        this._random_engine.seed(this._config.seed);
        this._random_generator = new Random(this._random_engine);

        //Setup round user data.
        this._round = [
            []
        ];
        //Randomize the order of the users.
        while (users.length > 0) {
            const random_user_index = this._random_generator.integer(0, users.length - 1);
            this._round[0].push(users[random_user_index]);
            users.splice(random_user_index, 1);
        }
        this._original_messages = this._config.messages;
        this._messages = [...this._original_messages];

        //Set method context bindings.
        this.start = this.start.bind(this);
        this.round_0 = this.round_0.bind(this);
        this.show_participants = this.show_participants.bind(this);
        this.round_x = this.round_x.bind(this);
        this.begin_round_matches = this.begin_round_matches.bind(this);
        this.default_participant_match = this.default_participant_match.bind(this);
        this.participant_match = this.participant_match.bind(this);
        this.determine_winner = this.determine_winner.bind(this);
        this.finish_round = this.finish_round.bind(this);
        this.fix_round_participants = this.fix_round_participants.bind(this);
        this.scroll_element_into_view = this.scroll_element_into_view.bind(this);
        this.create_group_div = this.create_group_div.bind(this);
        this.create_participant_div = this.create_participant_div.bind(this);
    }

    /**
     * Start running the application.
     */
    async start() {
        this.round_0();
    }

    /**
     * Setup round 0 (the round before the tournament starts).
     */
    async round_0() {
        this.fix_round_participants(0);

        //Setup the initial user group.
        const group_div = this.create_group_div();
        group_div.classList.remove("hide");
        group_div.classList.remove("right");
        this._wrapper.insertAdjacentElement("beforeend", group_div);
        this._round[0].forEach(user => {
            group_div.insertAdjacentElement("beforeend", this.create_participant_div(user));
        });

        requestTimeout(_ => {
            this.show_participants(group_div);
        }, 50);
    }

    /**
     * Shows each participant in the group one by one.
     * 
     * @param {HTMLElement} group_div The round group element.
     */
    show_participants(group_div) {
        scrollTo(0, 0);

        //Reveal each user in order one by one.
        let participant_div_index = 0;
        const participant_div_list = group_div.querySelectorAll(".participant.hide");
        participant_div_list.forEach(participant_div => {
            const this_obj = this;
            participant_div.addEventListener("transitionend", function hide_fn() {
                this.removeEventListener("transitionend", hide_fn);

                participant_div_index++;
                if (participant_div_index >= participant_div_list.length) {
                    //All users in the initial group have been revealed, start round 1.
                    this_obj.round_x(1);
                    return;
                }

                this_obj.scroll_element_into_view(participant_div_list[participant_div_index]);
                participant_div_list[participant_div_index].classList.remove("hide");
            });
        });
        participant_div_list[participant_div_index].classList.remove("hide");
    }

    /**
     * Starts the round of the given index.
     * 
     * @param {number} round_index The round number.
     */
    async round_x(round_index) {
        await this.round_begin_message(round_index);

        //Get the initial participant data and group element.
        const initial_group_div = this._wrapper.querySelector(".group");
        const initial_participants = this._round[round_index - 1];

        //Setup the group for the new round.
        this._round[round_index] = [];
        const winner_group_div = this.create_group_div();
        this._wrapper.insertAdjacentElement("beforeend", winner_group_div);
        //This new round will have half of the remaining participants, so setup empty paritipant elements for the winners.
        for (let participant_index = 0; participant_index < (initial_participants.length / 2); participant_index++) {
            const participant_div = this.create_participant_div("?");
            winner_group_div.insertAdjacentElement("beforeend", participant_div);
        }
        winner_group_div.classList.remove("hide");

        requestTimeout(_ => {
            this.begin_round_matches(round_index, initial_group_div, winner_group_div, initial_participants);
        }, 50);
    }

    /**
     * Start the matches in the round.
     * 
     * @param {HTMLElement} initial_group_div The initial participant round group element.
     * @param {HTMLElement} winner_group_div The winner round group element.
     */
    async begin_round_matches(round_index, initial_group_div, winner_group_div, initial_participants) {
        scrollTo(0, 0);

        //Go through each contesting pair and select a winner for that round.
        const initial_participant_div_list = initial_group_div.querySelectorAll(".participant");
        const winner_participant_div_list = winner_group_div.querySelectorAll(".participant");
        let participant_index = 0;
        let winner_participant_div_index = 0;
        winner_participant_div_list.forEach(winner_participant_div => {
            const this_obj = this;
            winner_participant_div.addEventListener("transitionend", async function show_fn() {
                this.removeEventListener("transitionend", show_fn);

                initial_participant_div_list[participant_index].classList.add("active");
                initial_participant_div_list[participant_index + 1].classList.add("active");
                winner_participant_div_list[winner_participant_div_index].classList.add("unknown");
                this_obj.scroll_element_into_view(winner_participant_div_list[winner_participant_div_index]);

                if (initial_participants[participant_index + 1] === "---") {
                    //If the second participant is a dummy one, just default to the first participant as a winner.
                    this_obj.default_participant_match(round_index, winner_participant_div_list, winner_participant_div_index, initial_participant_div_list, initial_participants, participant_index);
                    return;
                }

                await this_obj.participant_match(round_index, winner_participant_div_list, winner_participant_div_index, initial_participant_div_list, initial_participants, participant_index);

                participant_index += 2;
                if (participant_index >= initial_participants.length) {
                    //Clean up the current round.
                    this.finish_round(round_index);
                    return;
                }

                winner_participant_div_index++;
                winner_participant_div_list[winner_participant_div_index].classList.remove("hide");
            });
        });
        winner_participant_div_list[winner_participant_div_index].classList.remove("hide");
    }

    /**
     * Show a "round begin" message.
     * 
     * @param {number} round_index The round number.
     */
    round_begin_message(round_index) {
        return new Promise((resolve, _) => {
            const modal_wrapper = this._div.querySelector(".modal-wrapper");
            const modal_header = modal_wrapper.querySelector(".modal .header");
            const modal_text = modal_wrapper.querySelector(".modal .text");

            //Create a modal title stating the beginning of the round.
            const header = document.createElement("h2");
            header.classList.add("title");
            header.innerText = `Round ${round_index} Begins!`;
            modal_header.insertAdjacentElement("beforeend", header);

            //Set a modal text message wishing luck to the participants.
            modal_text.innerText = "Best of luck participants!";

            modal_wrapper.classList.remove("hide");

            requestTimeout(_ => {
                modal_wrapper.classList.add("hide");
                header.remove();
                modal_text.innerText = "";
                resolve(true);
            }, 2100);
        });
    }

    /**
     * Starts a match between two participants.
     * 
     * @param {number} round_index The round number.
     * @param {HTMLElement[]} winner_participant_div_list The winner participant elements list.
     * @param {number} winner_participant_div_index The current winner participant elements list index.
     * @param {HTMLElement[]} initial_participant_div_list The initial participant elements list.
     * @param {number} initial_participants The current initial participant elements list index.
     * @param {number} participant_index The current participant index.
     */
    participant_match(round_index, winner_participant_div_list, winner_participant_div_index, initial_participant_div_list, initial_participants, participant_index) {
        return new Promise((resolve, _) => {
            //Setup a name switcher that continuously switches between showing each participant name in the winner participant div.
            let current_name_index_offset = 0;
            const name_switch_interval_handle = requestInterval(_ => {
                winner_participant_div_list[winner_participant_div_index].innerText = initial_participants[participant_index + current_name_index_offset];
                current_name_index_offset = (current_name_index_offset + 1) % 2;
            }, 100);

            requestTimeout(_ => {
                //Determine the winner.
                this.determine_winner(initial_participants[participant_index], initial_participants[participant_index + 1]).then(random_index => {
                    requestTimeout(_ => {
                        //Stop name switching and set the name of the winner in the winner participant div.
                        clearRequestInterval(name_switch_interval_handle);
                        winner_participant_div_list[winner_participant_div_index].innerText = initial_participants[participant_index + random_index];
                        this._round[round_index].push(initial_participants[participant_index + random_index]);

                        winner_participant_div_list[winner_participant_div_index].classList.add("winner");
                        winner_participant_div_list[winner_participant_div_index].classList.remove("unknown");

                        requestTimeout(_ => {
                            winner_participant_div_list[winner_participant_div_index].classList.remove("winner");
                            initial_participant_div_list[participant_index].classList.remove("active");
                            initial_participant_div_list[participant_index + 1].classList.remove("active");

                            resolve(true);
                        }, 500);
                    }, 750);
                });
            }, 750);
        });
    }

    /**
     * Starts a match with a default participant winner.
     * 
     * @param {number} round_index The round number.
     * @param {HTMLElement[]} winner_participant_div_list The winner participant elements list.
     * @param {number} winner_participant_div_index The current winner participant elements list index.
     * @param {HTMLElement[]} initial_participant_div_list The initial participant elements list.
     * @param {number} initial_participants The current initial participant elements list index.
     * @param {number} participant_index The current participant index.
     */
    async default_participant_match(round_index, winner_participant_div_list, winner_participant_div_index, initial_participant_div_list, initial_participants, participant_index) {
        //Set the participant as the default winner.
        winner_participant_div_list[winner_participant_div_index].innerText = initial_participants[participant_index];
        this._round[round_index].push(initial_participants[participant_index]);

        winner_participant_div_list[winner_participant_div_index].classList.add("winner");
        winner_participant_div_list[winner_participant_div_index].classList.remove("unknown");

        requestTimeout(_ => {
            winner_participant_div_list[winner_participant_div_index].classList.remove("winner");
            initial_participant_div_list[participant_index].classList.remove("active");
            initial_participant_div_list[participant_index + 1].classList.remove("active");

            //Clean up the current round.
            this.finish_round(round_index);
        }, 1000);
    }

    /**
     * Selects a random participant as the winner, while showing a modal box stating that a winner is being selected.
     * 
     * @param {string} name_1 The name of the first participant.
     * @param {string} name_2 The name of the second participant.
     * 
     * @return A promise to return the selected winner.
     */
    determine_winner(name_1, name_2) {
        return new Promise((resolve, _) => {
            const modal_wrapper = this._div.querySelector(".modal-wrapper");
            const modal_header = modal_wrapper.querySelector(".modal .header");
            const modal_text = modal_wrapper.querySelector(".modal .text");

            //Create two modal titles, one that says the fight is between which participants, one that will announce the winning participant.
            const header_deciding = document.createElement("h2");
            header_deciding.classList.add("title");
            const header_decided = document.createElement("h2");
            header_decided.classList.add("title");
            header_decided.classList.add("hide");

            header_deciding.innerText = `${name_1} VS ${name_2}`;
            modal_header.insertAdjacentElement("beforeend", header_deciding);
            modal_header.insertAdjacentElement("beforeend", header_decided);

            let dots_count = 1;
            //Set a modal text message stating the winner is being selected.
            modal_text.innerText = "Selecting winner.";

            //Have a dot style loader to show that the app is working to select a winner.
            const dot_loading_handle = requestInterval(_ => {
                dots_count = (dots_count % 4) + 1;
                //Update the modal text message.
                modal_text.innerText = `Selecting Winner${new Array(dots_count).join(".")}`;
            }, 300);

            requestTimeout(_ => {
                //Stop the loader, select a participant at random, and announce the winner.
                clearRequestInterval(dot_loading_handle);

                //Select the winner at random.
                const random_index = this._random_generator.integer(0, 1);
                let name_winner = name_2;
                let name_loser = name_1
                if (random_index % 2 === 0) {
                    name_winner = name_1;
                    name_loser = name_2;
                }
                //Set a random winner-loser message and the title to the name of the winner.
                if (this._messages.length === 0) {
                    this._message = [...this._original_messages];
                }
                const random_message = this._random_generator.integer(0, this._messages.length - 1);
                modal_text.innerHTML = this._messages.splice(random_message, 1)[0].replace(/\#winner/g, name_winner).replace(/\#loser/g, name_loser);
                header_decided.innerText = `${name_winner} is the winner!`;

                requestTimeout(_ => {
                    modal_header.classList.add("next");
                    header_deciding.classList.add("hide");
                    header_decided.classList.remove("hide");

                    modal_header.addEventListener("transitionend", function move_fn() {
                        modal_header.removeEventListener("transitionend", move_fn);

                        requestTimeout(_ => {
                            //Hide the modal and show the return the selected winner.
                            modal_wrapper.classList.add("hide");
                            modal_header.classList.remove("next");
                            header_deciding.remove();
                            header_decided.remove();
                            modal_text.innerText = "";

                            resolve(random_index);
                        }, 3500);
                    });
                }, 500);
            }, 3000);

            modal_wrapper.classList.remove("hide");
        });
    }

    /**
     * Cleans up the current round.
     * 
     * @param {number} round_index The round number.
     */
    async finish_round(round_index) {
        if (this._round[round_index].length <= 1) {
            //If only one participant remained after the completion of the current round, end the application and announce the winner.
            this.end(this._round[round_index][0]);
            return;
        }

        const group_div_list = this._wrapper.querySelectorAll(".group");

        group_div_list[0].addEventListener("transitionend", function hide_fn() {
            //When the first group is hidden, delete it and then push the second group to the left.
            group_div_list[0].removeEventListener("transitionend", hide_fn);

            group_div_list[0].remove();
            requestTimeout(_ => {
                group_div_list[1].classList.remove("right");
            }, 50);
        });

        const this_obj = this;

        group_div_list[1].addEventListener("transitionend", function move_fn() {
            //When the second group has been pushed to the left, we can start the next round.
            group_div_list[1].removeEventListener("transitionend", move_fn);

            const old_participant_size = this_obj._round[round_index].length;
            this_obj.fix_round_participants(round_index);
            const new_participant_size = this_obj._round[round_index].length;
            //If a dummy participant was added, then we should add a participant div for it in the group.
            if (new_participant_size > old_participant_size) {
                for (let extra_participant_index = old_participant_size; extra_participant_index < new_participant_size; extra_participant_index++) {
                    const participant_div = this_obj.create_participant_div(this_obj._round[round_index][extra_participant_index]);
                    participant_div.classList.remove("hide");
                    group_div_list[1].insertAdjacentElement("beforeend", participant_div);
                }
            }

            requestTimeout(_ => {
                //Start the next round.
                this_obj.round_x(round_index + 1);
            }, 1000);
        });

        //Hide the old group.
        group_div_list[0].classList.add("hide");
    }

    /**
     * End the application with a modal message stating the winner.
     * 
     * @param {string} name The name of the winner.
     */
    async end(name) {
        const modal_wrapper = this._div.querySelector(".modal-wrapper");
        const modal_header = modal_wrapper.querySelector(".modal .header");
        const modal_text = modal_wrapper.querySelector(".modal .text");

        //Create a modal title announcing the winner
        const header = document.createElement("h2");
        header.classList.add("title");
        header.innerText = `${name} IS THE WINNER!!!`;
        modal_header.insertAdjacentElement("beforeend", header);

        //Set a modal text message congratulating the winner.
        modal_text.innerText = "CONGRATULATIONS!";

        this._wrapper.classList.add("hide");
        modal_wrapper.classList.remove("hide");
    }

    /**
     * Add a dummy participant if odd number of participants are present.
     * 
     * @param {number} round_index The round number.
     */
    fix_round_participants(round_index) {
        if (this._round[round_index].length % 2 === 1) {
            this._round[round_index].push("---");
        }
    }

    /**
     * Smooth scrolls the given element into view.
     * 
     * @param {HTMLElement} el The element to scroll into view.
     */
    async scroll_element_into_view(el) {
        el.scrollIntoView({ behavior: "smooth" });
    }

    /**
     * Creates a group div element,
     * 
     * @return The created element.
     */
    create_group_div() {
        const group_div = document.createElement("div");
        group_div.classList.add("group");
        group_div.classList.add("right");
        group_div.classList.add("hide");
        return group_div;
    }

    /**
     * Creates a participant div element with the given participant name.
     * 
     * @param {string} name The participant name.
     * 
     * @return The created element.
     */
    create_participant_div(name) {
        const participant_div = document.createElement("div");
        participant_div.classList.add("participant");
        participant_div.classList.add("hide");
        participant_div.innerText = name;
        return participant_div;
    }
}