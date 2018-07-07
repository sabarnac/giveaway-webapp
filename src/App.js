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

        //Set method context bindings.
        this.start = this.start.bind(this);
        this.round_0 = this.round_0.bind(this);
        this.round_x = this.round_x.bind(this);
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
        }, 50);
    }

    /**
     * Starts the round of the given index.
     * 
     * @param {int} round_index The round number.
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
            scrollTo(0, 0);

            //Go through each contesting pair and select a winner for that round.
            const initial_participant_div_list = initial_group_div.querySelectorAll(".participant");
            const winner_participant_div_list = winner_group_div.querySelectorAll(".participant");
            let participant_index = 0;
            let winner_participant_div_index = 0;
            winner_participant_div_list.forEach(winner_participant_div => {
                const this_obj = this;
                winner_participant_div.addEventListener("transitionend", function show_fn() {
                    this.removeEventListener("transitionend", show_fn);

                    initial_participant_div_list[participant_index].classList.add("active");
                    initial_participant_div_list[participant_index + 1].classList.add("active");
                    winner_participant_div_list[winner_participant_div_index].classList.add("unknown");
                    this_obj.scroll_element_into_view(winner_participant_div_list[winner_participant_div_index]);

                    if (initial_participants[participant_index + 1] === "---") {
                        //If the second participant is a dummy one, just default to the first participant as a winner.
                        winner_participant_div_list[winner_participant_div_index].innerText = initial_participants[participant_index];
                        this_obj._round[round_index].push(initial_participants[participant_index]);

                        winner_participant_div_list[winner_participant_div_index].classList.add("winner");
                        winner_participant_div_list[winner_participant_div_index].classList.remove("unknown");

                        requestTimeout(_ => {
                            winner_participant_div_list[winner_participant_div_index].classList.remove("winner");
                            initial_participant_div_list[participant_index].classList.remove("active");
                            initial_participant_div_list[participant_index + 1].classList.remove("active");

                            participant_index += 2;
                            if (participant_index >= initial_participants.length) {
                                //Clean up the current round.
                                this_obj.finish_round(round_index);
                                return;
                            }
                        }, 1000);
                        return;
                    }

                    //Setup a name switcher that continuously switches between showing each participant name in the winner participant div.
                    let current_name_index_offset = 0;
                    const name_switch_interval_handle = requestInterval(_ => {
                        winner_participant_div_list[winner_participant_div_index].innerText = initial_participants[participant_index + current_name_index_offset];
                        current_name_index_offset = (current_name_index_offset + 1) % 2;
                    }, 100);

                    requestTimeout(_ => {
                        //Determine the winner.
                        this_obj.determine_winner(initial_participants[participant_index], initial_participants[participant_index + 1]).then(random_index => {
                            requestTimeout(_ => {
                                //Stop name switching and set the name of the winner in the winner participant div.
                                clearRequestInterval(name_switch_interval_handle);
                                winner_participant_div_list[winner_participant_div_index].innerText = initial_participants[participant_index + random_index];
                                this_obj._round[round_index].push(initial_participants[participant_index + random_index]);

                                winner_participant_div_list[winner_participant_div_index].classList.add("winner");
                                winner_participant_div_list[winner_participant_div_index].classList.remove("unknown");

                                requestTimeout(_ => {
                                    winner_participant_div_list[winner_participant_div_index].classList.remove("winner");
                                    initial_participant_div_list[participant_index].classList.remove("active");
                                    initial_participant_div_list[participant_index + 1].classList.remove("active");

                                    participant_index += 2;
                                    if (participant_index >= initial_participants.length) {
                                        //Clean up the current round.
                                        this_obj.finish_round(round_index);
                                        return;
                                    }

                                    winner_participant_div_index++;
                                    winner_participant_div_list[winner_participant_div_index].classList.remove("hide");
                                }, 500);
                            }, 750);
                        });
                    }, 750);
                });
            });
            winner_participant_div_list[winner_participant_div_index].classList.remove("hide");
        }, 50);
    }

    /**
     * Show a "round begin" message.
     * 
     * @param {int} round_index The round number.
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
                //State in the modal text message that a winner is selected.
                modal_text.innerText = "Winner Selected!";

                const random_index = this._random_generator.integer(0, 1);
                let name_winner = name_2;
                if (random_index % 2 === 0) {
                    name_winner = name_1;
                }
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
                        }, 2000);
                    });
                }, 500);
            }, 3000);

            modal_wrapper.classList.remove("hide");
        });
    }

    /**
     * Cleans up the current round.
     * 
     * @param {int} round_index The round number.
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
     * @param {int} round_index The round number.
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