"use strict";

import Random from "random-js";
import { requestTimeout, requestInterval, clearRequestInterval } from "./custom.js";

const SpeedBooster = {
    HALF: 0.5,
    ONE: 1,
    ONE_POINT_FIVE: 1.5,
    TWO: 2,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20
};

/**
 * Class that acts as our primary application.
 */
export default class App {

    /**
     * Constructs the application by setting class properties, and properly binding class methods.
     * 
     * @param {object} config The application configuration.
     * @param {array} users The list of users among which the tournament will occur.
     * @param {HTMLElement} div The HTML element to attach the application too.
     */
    constructor(config, users, div) {
        console.log("Constructing application.");

        //Setup dependencues
        console.log("Setting up dependencies.");
        this._config = config;
        this._div = div;
        this._wrapper = this._div.querySelector(".wrapper");
        this._random_engine = Random.engines.mt19937();
        //Seed the generator with the config value so that everything is repeatable.
        console.log(`Seed: ${this._config.seed}`);
        this._random_engine.seed(this._config.seed);
        this._random_generator = new Random(this._random_engine);
        console.log("Dependencies setup complete.");
        //Setting up the speed of animations.
        this._current_speed = SpeedBooster.ONE;
        this.remove_all_classes_from_element(this._div);
        this._div.classList.add("x1");
        console.log(`Animation speed set to ${this._current_speed}.`);

        //Setup round user data.
        console.log("Setting up data.");
        this._round = [
            []
        ];
        //Randomize the order of the users.
        this._round[0] = [...this._random_generator.shuffle(users)];
        console.log("Users: ");
        console.table(this._round[0]);
        this._original_messages = this._config.messages;
        console.log("Messages: ");
        console.table(this._config.messages);
        this._messages = [...this._original_messages];
        console.log("Data setup complete.");

        //Set method context bindings.
        console.log("Setting up method context bindings.");
        this.start = this.start.bind(this);
        this.round_0 = this.round_0.bind(this);
        this.show_participants = this.show_participants.bind(this);
        this.round_x = this.round_x.bind(this);
        this.round_begin_message = this.round_begin_message.bind(this);
        this.begin_round_matches = this.begin_round_matches.bind(this);
        this.participant_match = this.participant_match.bind(this);
        this.default_participant_match = this.default_participant_match.bind(this);
        this.determine_winner = this.determine_winner.bind(this);
        this.finish_round = this.finish_round.bind(this);
        this.round_end_message = this.round_end_message.bind(this);
        this.show_losing_participant = this.show_losing_participant.bind(this);
        this.end = this.end.bind(this);
        this.pad_participants_list = this.pad_participants_list.bind(this);
        this.unpad_participants_list = this.unpad_participants_list.bind(this);
        this.scroll_element_into_view = this.scroll_element_into_view.bind(this);
        this.create_group_div = this.create_group_div.bind(this);
        this.create_participant_div = this.create_participant_div.bind(this);
        console.log("Method context bindings setup complete.");

        //Set up speed button click listeners.
        this._div.querySelector("#speed-0-5x").addEventListener("click", ev => {
            ev.preventDefault();
            this._current_speed = SpeedBooster.HALF;
            this.remove_all_classes_from_element(this._div);
            this._div.classList.add("x0_5");
            console.log(`Animation speed updated to ${this._current_speed}.`);
        });
        this._div.querySelector("#speed-1x").addEventListener("click", ev => {
            ev.preventDefault();
            this._current_speed = SpeedBooster.ONE;
            this.remove_all_classes_from_element(this._div);
            this._div.classList.add("x1");
            console.log(`Animation speed updated to ${this._current_speed}.`);
        });
        this._div.querySelector("#speed-1-5x").addEventListener("click", ev => {
            ev.preventDefault();
            this._current_speed = SpeedBooster.ONE_POINT_FIVE;
            this.remove_all_classes_from_element(this._div);
            this._div.classList.add("x1_5");
            console.log(`Animation speed updated to ${this._current_speed}.`);
        });
        this._div.querySelector("#speed-2x").addEventListener("click", ev => {
            ev.preventDefault();
            this._current_speed = SpeedBooster.TWO;
            this.remove_all_classes_from_element(this._div);
            this._div.classList.add("x2");
            console.log(`Animation speed updated to ${this._current_speed}.`);
        });
        this._div.querySelector("#speed-5x").addEventListener("click", ev => {
            ev.preventDefault();
            this._current_speed = SpeedBooster.FIVE;
            this.remove_all_classes_from_element(this._div);
            this._div.classList.add("x5");
            console.log(`Animation speed updated to ${this._current_speed}.`);
        });
        this._div.querySelector("#speed-10x").addEventListener("click", ev => {
            ev.preventDefault();
            this._current_speed = SpeedBooster.TEN;
            this.remove_all_classes_from_element(this._div);
            this._div.classList.add("x10");
            console.log(`Animation speed updated to ${this._current_speed}.`);
        });
        this._div.querySelector("#speed-20x").addEventListener("click", ev => {
            ev.preventDefault();
            this._current_speed = SpeedBooster.TWENTY;
            this.remove_all_classes_from_element(this._div);
            this._div.classList.add("x20");
            console.log(`Animation speed updated to ${this._current_speed}.`);
        });
    }

    /**
     * Start running the application.
     */
    async start() {
        console.log("Starting the tournament!!!");
        this.round_0();
    }

    /**
     * Setup round 0 (the round before the tournament starts).
     */
    async round_0() {
        console.log("Starting Round 0");

        console.log("Padding participants list.");
        this.pad_participants_list(0);
        console.log("Padded participants list.");

        //Setup the initial user group.
        console.log("Creating initial participants group.");
        const group_div = this.create_group_div();
        group_div.classList.remove("hide");
        group_div.classList.remove("right");
        this._wrapper.insertAdjacentElement("beforeend", group_div);
        this._round[0].forEach(user => {
            console.log(`Adding participant: ${user}`);
            group_div.insertAdjacentElement("beforeend", this.create_participant_div(user));
            console.log("Added participant.");
        });
        console.log("Created initial participants group.");

        requestTimeout(_ => {
            this.show_participants(group_div);
        }, 50 / this._current_speed);
    }

    /**
     * Shows each participant in the group one by one.
     * 
     * @param {HTMLElement} group_div The round group element.
     */
    show_participants(group_div) {
        console.log("Showing initial participants group list.");
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
                    console.log("All participants visible.");
                    this_obj.round_x(1);
                    return;
                }

                console.log(`Showing participant, (Index: ${participant_div_index})`);
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
        console.log(`Starting Round ${round_index}.`);
        await this.round_begin_message(round_index);

        //Get the initial participant data and group element.
        console.log(`Retrieving initial participants list from Round ${round_index - 1}.`);
        const initial_group_div = this._wrapper.querySelector(".group");
        const initial_participants = this._round[round_index - 1];
        console.log(`Retrieved initial participants list from Round ${round_index - 1}.`);

        //Setup the group for the new round.
        console.log(`Setting up for winners of Round ${round_index}.`);
        this._round[round_index] = [];
        const winner_group_div = this.create_group_div();
        this._wrapper.insertAdjacentElement("beforeend", winner_group_div);
        //This new round will have half of the remaining participants, so setup empty paritipant elements for the winners.
        for (let participant_index = 0; participant_index < (initial_participants.length / 2); participant_index++) {
            console.log(`Setting up block for potential winner. (Index: ${participant_index})`);
            const participant_div = this.create_participant_div("?");
            winner_group_div.insertAdjacentElement("beforeend", participant_div);
            console.log(`Setup block for potential winner complete.`);
        }
        winner_group_div.classList.remove("hide");
        console.log(`Setup for winners of Round ${round_index} complete.`);

        requestTimeout(_ => {
            this.begin_round_matches(round_index, initial_group_div, winner_group_div, initial_participants);
        }, 50 / this._current_speed);
    }

    /**
     * Show a message stating the round is about to begin.
     * 
     * @param {number} round_index The round number.
     */
    round_begin_message(round_index) {
        return new Promise((resolve, _) => {
            console.log(`Show a message stating Round ${round_index} is gonna begin.`);

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
                console.log("Begin round message is shown. We can now start the round.");
                resolve(true);
            }, 2500 / this._current_speed);
        });
    }

    /**
     * Start the matches in the round.
     * 
     * @param {HTMLElement} initial_group_div The initial participant round group element.
     * @param {HTMLElement} winner_group_div The winner round group element.
     */
    async begin_round_matches(round_index, initial_group_div, winner_group_div, initial_participants) {
        console.log(`Starting matches for Round ${round_index}.`);

        scrollTo(0, 0);

        //Go through each contesting pair and select a winner for that round.
        console.log("Retrieving initial particpant and final participant div lists.");
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
                    console.log("One of the participants is a dummy. Selecting the only actual participant as the default winner.");
                    this_obj.default_participant_match(round_index, winner_participant_div_list, winner_participant_div_index, initial_participant_div_list, initial_participants, participant_index);
                    return;
                }

                console.log("Start the match between the two participants.");
                await this_obj.participant_match(round_index, winner_participant_div_list, winner_participant_div_index, initial_participant_div_list, initial_participants, participant_index);

                participant_index += 2;
                if (participant_index >= initial_participants.length) {
                    //Clean up the current round.
                    console.log(`All matches in Round ${round_index} are complete.`);
                    this_obj.finish_round(round_index);
                    return;
                }

                winner_participant_div_index++;
                console.log(`Showing the next participant div. (Index: ${winner_participant_div_index})`);
                winner_participant_div_list[winner_participant_div_index].classList.remove("hide");
            });
        });
        console.log(`Showing the participant div. (Index: ${winner_participant_div_index})`);
        winner_participant_div_list[winner_participant_div_index].classList.remove("hide");
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
            console.log(`Starting participant match in Round ${round_index}. (Participant index: ${participant_index})`);

            //Setup a name switcher that continuously switches between showing each participant name in the winner participant div.
            let current_name_index_offset = 0;
            console.log("Setting up a name switcher.");
            const name_switch_interval_handle = requestInterval(_ => {
                winner_participant_div_list[winner_participant_div_index].innerText = initial_participants[participant_index + current_name_index_offset];
                current_name_index_offset = (current_name_index_offset + 1) % 2;
            }, 100 / this._current_speed);

            requestTimeout(_ => {
                //Determine the winner.
                console.log("Get a randomly selected winner.");
                this.determine_winner(initial_participants[participant_index], initial_participants[participant_index + 1]).then(random_index_offset => {
                    requestTimeout(_ => {
                        console.log(`Show the winner name in the winner participant div. (Participant index offset: ${random_index_offset})`);
                        //Stop name switching and set the name of the winner in the winner participant div.
                        clearRequestInterval(name_switch_interval_handle);
                        winner_participant_div_list[winner_participant_div_index].innerText = initial_participants[participant_index + random_index_offset];
                        this._round[round_index].push(initial_participants[participant_index + random_index_offset]);

                        winner_participant_div_list[winner_participant_div_index].classList.add("winner");
                        winner_participant_div_list[winner_participant_div_index].classList.remove("unknown");

                        requestTimeout(_ => {
                            winner_participant_div_list[winner_participant_div_index].classList.remove("winner");
                            initial_participant_div_list[participant_index].classList.remove("active");
                            initial_participant_div_list[participant_index + 1].classList.remove("active");

                            console.log(`Match is complete. The winner is: ${winner_participant_div_list[winner_participant_div_index].innerText}`);
                            resolve(true);
                        }, 500 / this._current_speed);
                    }, 750 / this._current_speed);
                });
            }, 750 / this._current_speed);
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
        console.log(`Only one actual participant in the list. Selecting that participant as the winner by default. (Index: ${participant_index})`);

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
            console.log(`Round ${round_index} is complete.`);
            this.finish_round(round_index);
        }, 1000 / this._current_speed);
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
            console.log(`Determine winner between: ${name_1} & ${name_2}`);

            const modal_wrapper = this._div.querySelector(".modal-wrapper");
            const modal_header = modal_wrapper.querySelector(".modal .header");
            const modal_text = modal_wrapper.querySelector(".modal .text");

            //Create two modal titles, one that says the fight is between which participants, one that will announce the winning participant.
            console.log("Showing a modal stating that the winner is being selected and the match is between which participants.");
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
            modal_text.innerText = "Selecting Winner.";

            //Have a dot style loader to show that the app is working to select a winner.
            const dot_loading_handle = requestInterval(_ => {
                dots_count = (dots_count % 4) + 1;
                //Update the modal text message.
                modal_text.innerText = `Selecting Winner${new Array(dots_count).join(".")}`;
            }, 300 / this._current_speed);

            requestTimeout(_ => {
                //Stop the loader, select a participant at random, and announce the winner.
                clearRequestInterval(dot_loading_handle);
                modal_text.innerText = "Winner Selected.";

                //Select the winner at random.
                console.log("Selecting a random winner.");
                const random_index_offset = this._random_generator.integer(0, 1);
                let name_winner = name_2;
                let name_loser = name_1
                if (random_index_offset % 2 === 0) {
                    name_winner = name_1;
                    name_loser = name_2;
                }
                console.log(`Selected winner: ${name_winner}`);
                console.log(`Selected loser: ${name_loser}`);
                header_decided.innerText = `${name_winner} is the winner!`;

                const this_obj = this;
                header_decided.addEventListener("transitionend", function move_fn() {
                    header_decided.removeEventListener("transitionend", move_fn);

                    requestTimeout(_ => {
                        //Set a random winner-loser message and the title to the name of the winner.
                        if (this_obj._messages.length === 0) {
                            console.log("Ran out of winner-loser messages. Refilling the list.");
                            this_obj._messages = [...this_obj._original_messages];
                        }
                        const random_message = this_obj._random_generator.integer(0, this_obj._messages.length - 1);
                        console.log("Showing random winner-loser message and removing it from the messages list.");
                        modal_text.innerHTML = this_obj._messages.splice(random_message, 1)[0].replace(/\#winner/g, name_winner).replace(/\#loser/g, name_loser);

                        requestTimeout(_ => {
                            //Hide the modal and show the return the selected winner.
                            modal_wrapper.classList.add("hide");
                            modal_header.classList.remove("next");
                            header_deciding.remove();
                            header_decided.remove();
                            modal_text.innerText = "";

                            console.log(`Returning the selected winner. (Index offset: ${random_index_offset})`);
                            resolve(random_index_offset);
                        }, 2500 / this_obj._current_speed);
                    }, 500 / this_obj._current_speed);
                });

                modal_header.classList.add("next");
                header_deciding.classList.add("hide");
                header_decided.classList.remove("hide");
            }, 3000 / this._current_speed);

            modal_wrapper.classList.remove("hide");
        });
    }

    /**
     * Cleans up the current round.
     * 
     * @param {number} round_index The round number.
     */
    async finish_round(round_index) {
        console.log(`Round ${round_index} is complete.`);

        this.unpad_participants_list(round_index - 1);

        if (this._round[round_index].length <= 1) {
            //If only one participant remained after the completion of the current round, end the application and announce the winner.
            console.log("This was the final round.");
            this.end(this._round[round_index][0]);
            return;
        }

        await this.round_end_message(round_index);

        const group_div_list = this._wrapper.querySelectorAll(".group");

        const this_obj = this;
        group_div_list[0].addEventListener("transitionend", function hide_fn() {
            //When the first group is hidden, delete it and then push the second group to the left.
            group_div_list[0].removeEventListener("transitionend", hide_fn);

            console.log("Initial participants group is hidden. Delete it.");
            group_div_list[0].remove();
            requestTimeout(_ => {
                console.log("Push the results participants group to the left, making it the new initial participants div.");
                group_div_list[1].classList.remove("right");
            }, 50 / this_obj._current_speed);
        });

        group_div_list[1].addEventListener("transitionend", function move_fn() {
            //When the second group has been pushed to the left, we can start the next round.
            group_div_list[1].removeEventListener("transitionend", move_fn);

            console.log("Pushed the results participants group to the left.");
            const old_participant_size = this_obj._round[round_index].length;
            console.log("Padding the new participants list.");
            this_obj.pad_participants_list(round_index);
            const new_participant_size = this_obj._round[round_index].length;
            //If a dummy participant was added, then we should add a participant div for it in the group.
            if (new_participant_size > old_participant_size) {
                console.log("Participants list was padded. Add the dummy participant(s) to the group participants list.");
                for (let extra_participant_index = old_participant_size; extra_participant_index < new_participant_size; extra_participant_index++) {
                    const participant_div = this_obj.create_participant_div(this_obj._round[round_index][extra_participant_index]);
                    participant_div.classList.remove("hide");
                    group_div_list[1].insertAdjacentElement("beforeend", participant_div);
                }
            }

            requestTimeout(_ => {
                //Start the next round.
                console.log("Start the next round.");
                this_obj.round_x(round_index + 1);
            }, 1000 / this_obj._current_speed);
        });

        //Hide the old group.
        console.log("Hide the initial participants group.");
        group_div_list[0].classList.add("hide");
    }

    /**
     * Show a message stating the round has ended, and noting the lost participants.
     * 
     * @param {number} round_index The round number.
     */
    round_end_message(round_index) {
        return new Promise((resolve, _) => {
            console.log(`Show a message stating Round ${round_index} has ended.`);

            const modal_wrapper = this._div.querySelector(".modal-wrapper");
            const modal_header = modal_wrapper.querySelector(".modal .header");
            const modal_text = modal_wrapper.querySelector(".modal .text");
            const modal_text_2 = modal_wrapper.querySelector(".modal .name");

            //Create a modal title stating the beginning of the round.
            const header = document.createElement("h2");
            header.classList.add("title");
            header.innerText = `Round ${round_index} Ends!`;
            modal_header.insertAdjacentElement("beforeend", header);

            //Set a modal text message wishing luck to the participants.
            modal_text.innerText = "Casualties";

            const this_obj = this;
            modal_wrapper.addEventListener("transitionend", async function show_fn() {
                modal_wrapper.removeEventListener("transitionend", show_fn);

                //Modal is visible, start scrolling through the casualties.
                const old_participants = this_obj._round[round_index - 1];
                const new_participants = this_obj._round[round_index];

                for (let participant_index = 0; participant_index < old_participants.length; participant_index++) {
                    if (new_participants.indexOf(old_participants[participant_index]) == -1) {
                        await this_obj.show_losing_participant(modal_text_2, old_participants[participant_index]);
                    }
                }

                requestTimeout(_ => {
                    //Hide the message and go back.
                    console.log("Hiding modal box.");
                    modal_wrapper.classList.add("hide");
                    header.remove();
                    modal_text.innerText = "";
                    console.log("Begin round message is shown. We can now start the round.");
                    resolve(true);
                }, 500 / this_obj._current_speed);
            });

            modal_wrapper.classList.remove("hide");
        });
    }

    /**
     * Shows the and hides the given name in the given modal text div,
     * 
     * @param {HTMLElement} modal_text_2 The div to show the name in.
     * @param {HTMLElement} name The name to show.
     */
    show_losing_participant(modal_text_2, name) {
        return new Promise((resolve, _) => {
            modal_text_2.innerText = name;


            const this_obj = this;
            modal_text_2.addEventListener("transitionend", function show_fn() {
                modal_text_2.removeEventListener("transitionend", show_fn);

                modal_text_2.addEventListener("transitionend", function hide_fn() {
                    modal_text_2.removeEventListener("transitionend", hide_fn);

                    //Done showing the name. Go back.
                    console.log("Losing participant name shown");
                    resolve(true);
                });

                requestTimeout(_ => {
                    //Hide the name,
                    console.log("Hide the losing participant name.");
                    modal_text_2.classList.add("hide");
                }, 500 / this_obj._current_speed);
            });

            //Show the name.
            console.log(`Show the losing participant name. (Name: ${name})`);
            modal_text_2.classList.remove("hide");
        });
    }

    /**
     * End the application with a modal message stating the winner.
     * 
     * @param {string} name The name of the winner.
     */
    async end(name) {
        console.log(`Tournament complete! We have a winner: ${name}`);

        console.log("Announce the winner in the modal.");
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

        console.log("The tournament ends here.");
    }

    /**
     * Add a dummy participant if odd number of participants are present.
     * 
     * @param {number} round_index The round number.
     */
    pad_participants_list(round_index) {
        if (this._round[round_index].length % 2 === 1) {
            console.log(`Odd number of participants in Round ${round_index}. Pad the list with a dummy participant.`);
            this._round[round_index].push("---");
            console.log("Padded participants list.");
        }
    }

    /**
     * Add a dummy participant if odd number of participants are present.
     * 
     * @param {number} round_index The round number.
     */
    unpad_participants_list(round_index) {
        const total_participants = this._round[round_index].length;
        if (this._round[round_index][total_participants - 1] === "---") {
            console.log(`Removing dummy participant in participants list.`);
            this._round[round_index].splice(total_participants - 1, 1);
            console.log(`Removed dummy participant in participants list.`);
        }
    }

    /**
     * Smooth scrolls the given element into view.
     * 
     * @param {HTMLElement} el The element to scroll into view.
     */
    async scroll_element_into_view(el) {
        console.log("Scrolling element into view: ");
        console.log(el);
        el.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "end"
        });
        console.log("Scrolled element into view.");
    }

    /**
     * Creates a group div element,
     * 
     * @return The created element.
     */
    create_group_div() {
        console.log("Creating new round group div element.");
        const group_div = document.createElement("div");
        group_div.classList.add("group");
        group_div.classList.add("right");
        group_div.classList.add("hide");
        console.log("Created new round group div element.");
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
        console.log(`Creating new round participant div element for participant: ${name}`);
        const participant_div = document.createElement("div");
        participant_div.classList.add("participant");
        participant_div.classList.add("hide");
        participant_div.innerText = name;
        console.log("Created new round participant div element.");
        return participant_div;
    }

    remove_all_classes_from_element(div) {
        while (this._div.classList.length > 0) {
            this._div.classList.remove(this._div.classList.item(0));
        }
    }
}