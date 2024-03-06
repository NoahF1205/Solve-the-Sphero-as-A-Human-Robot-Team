
// Variables to keep track of the course and the player's
// current position
var track = [0,0,1,1,0,1,0,1,0,0];
var length = 10;
var index = 0;
var task = "shuffle";
var score = 0;


async function startProgram() {
    setStabilization(true);
    
    // Introduction
	await speak('Assist the robot in navigating a virtual obstacle course as quickly as possible. The robot will need assistance with vertical or horizontal movement.');
	await speak('You cannot see the obstacle course. Instead, use audio and visual clues to take the correct action.');
	await speak('The game will begin momentarily');
	await delay(0.1);
	await Sound.Effects.Whistle.play();
    
    // Keep taking actions until we get to the end of the track
	while (index < length) {
        await delay(0.25);
		
		if (track[index] == 1) {
			task = "jump";
			await setMainLed({ r: 0, g: 0, b: 255});
			await spin(-360, 0.25);
		} else {
			task = "shuffle";
			await setMainLed({ r: 0, g: 255, b: 0});
			await spin(360, 0.25);
		}
		
		await take_action();
        await delay(0.25);
		index = index + 1;
		if (getElapsedTime() > 120){
			await speak("You are out of time.");
			exitProgram();
		}
    }
	
	// Give the final score
	await speak("Game over");
	if (score == 0) {
		await speak("You scored 0 percent correctly");
	}
	if (score == 1) {
		await speak("You scored 10 percent correctly");
	}
	if (score == 2) {
		await speak("You scored 20 percent correctly");
	}
	if (score == 3) {
		await speak("You scored 30 percent correctly");
	}
	if (score == 4) {
		await speak("You scored 40 percent correctly");
	}
	if (score == 5) {
		await speak("You scored 50 percent correctly");
	}
	if (score == 6) {
		await speak("You scored 60 percent correctly");
	}
	if (score == 7) {
		await speak("You scored 70 percent correctly");
	}
	if (score == 8) {
		await speak("You scored 80 percent correctly");
	}
	if (score == 9) {
		await speak("You scored 90 percent correctly");
	}
	if (score == 10) {
		await speak("You scored 100 percent correctly");
	}
	
    await delay(2);
	
    exitProgram();
}


async function take_action() {	

	// Play an audio cue for either jumping or shuffling
	if (task == "jump") {
		await Sound.Effects.Boing.play(true);
		await delay(0.25);
	}
	
	if (task == "shuffle") {
		await Sound.Effects.Running.play(true);
		await delay(0.25);
	}
	
	while (true) {
		await delay(0.25);
		
		// Jump
        if (Math.sqrt((getAcceleration().x ** 2) + (getAcceleration().y ** 2) + (getAcceleration().z ** 2)) <= 0.2 && getElapsedTime() > 0.1) {
			if (task == "jump") {
				await Sound.Game.Confirm.play(true);
				score = score + 1;
				break;
			} else {
				await Sound.Game.Fail.play(true);
				break;
			}
        }
		
		// Shuffle
		if (Math.sqrt((getAcceleration().x ** 2) + (getAcceleration().y ** 2) + (getAcceleration().z ** 2)) >= 5 && getElapsedTime() > 0.5) {
			if (task == "shuffle") {
				await Sound.Game.Confirm.play(true);
				score = score + 1;
				break;
			} else {
				await Sound.Game.Fail.play(true);
				break;
			}

        }

        await delay(0.25);
    }
}
