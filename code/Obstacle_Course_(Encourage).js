
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
	await speak('Hello, my name is Speed E. I am trying to navigate a virtual obstacle course, but I need help! Especially with jumping and sidestepping.');
	await speak('Would you mind helping me? You will not be able to see the course, but I will give you a clue whenever I need help.');
	await speak('On my mark');
	await delay(0.1);
	await speak('Get set');
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
			await Sound.Game.YouLose.play(true);
			await speak("You were just about there!");
			await speak("Time is up, better luck next time!");
			exitProgram();
		}
		
    }
	
	// Give the final score
	await speak("We made it to the end. Let's see how well you did.");
	await delay(0.25);
	await speak("Calculating...");
	await delay(0.5);
	await speak("Calculations finished");
	if (score == 0) {
		await speak("You scored 0 percent correctly. You'll do better next time!");
	}
	if (score == 1) {
		await speak("You scored 10 percent correctly. I'm sure this was a great learning experience for you!");
	}
	if (score == 2) {
		await speak("You scored 20 percent correctly. Are you sure you were trying?");
	}
	if (score == 3) {
		await speak("You scored 30 percent correctly. That was a good attempt.");
	}
	if (score == 4) {
		await speak("You scored 40 percent correctly. Better luck next time.");
	}
	if (score == 5) {
		await speak("You scored 50 percent correctly. You almost passed. Better luck next time.");
	}
	if (score == 6) {
		await speak("You scored 60 percent correctly. That's pretty good.");
	}
	if (score == 7) {
		await speak("You scored 70 percent correctly. Nice work!");
	}
	if (score == 8) {
		await speak("You scored 80 percent correctly. Very nice work!");
	}
	if (score == 9) {
		await speak("You scored 90 percent correctly. Great job!");
	}
	if (score == 10) {
		await speak("You scored 100 percent correctly. Amazing! I've never seen anyone do so well.");
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
				if (index == 2) {
					await speak('Im flying!');
				}
				if (index == 3) {
					await speak('Nice job!');
				}
				if (index == 7) {
					await speak('You are so good at this!');
				}
				
				await Sound.Game.Confirm.play(true);
				score = score + 1;
				break;
			} else {
				if (index == 0) {
					await speak('To sidestep, I need to move quickly from side to side.');
				}				
				if (index == 1) {
					await speak('Not up! Sideways please.');
				}	
				
				await Sound.Game.Fail.play(true);
				break;
			}
        }
		
		// Shuffle
		if (Math.sqrt((getAcceleration().x ** 2) + (getAcceleration().y ** 2) + (getAcceleration().z ** 2)) >= 5 && getElapsedTime() > 0.5) {
			if (task == "shuffle") {
				if (index == 0) {
					await speak('Wow! How did you figure that out?');
				}
				if (index == 4) {
					await speak('I like it when you shake me.');
				}
				if (index == 9) {
					await speak('Finishing like a champion.');
				}				
				
				await Sound.Game.Confirm.play(true);
				score = score + 1;
				break;
			} else {
				if (index == 2) {
					await speak('To jump well, I need to get airborne. Just not too high please.');
				}	
				if (index == 3) {
					await speak('Remember. I am trying to jump here. That means going upwards.');
				}	
				
				await Sound.Game.Fail.play(true);
				break;
			}

        }

        await delay(0.25);
    }
}

registerMatrixAnimation({
	frames: [[[4, 4, 4, 4, 4, 4, 4, 4], [4, 1, 1, 1, 1, 1, 1, 1], [4, 1, 1, 1, 1, 1, 1, 1], [4, 4, 4, 4, 4, 4, 4, 4], [4, 4, 4, 4, 4, 4, 4, 4], [4, 1, 1, 1, 1, 1, 1, 1], [4, 1, 1, 1, 1, 1, 1, 1], [4, 4, 4, 4, 4, 4, 4, 4]]],
	palette: [{ r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 }, { r: 255, g: 0, b: 0 }, { r: 255, g: 64, b: 0 }, { r: 255, g: 128, b: 0 }, { r: 255, g: 191, b: 0 }, { r: 255, g: 255, b: 0 }, { r: 185, g: 246, b: 30 }, { r: 0, g: 255, b: 0 }, { r: 185, g: 255, b: 255 }, { r: 0, g: 255, b: 255 }, { r: 0, g: 0, b: 255 }, { r: 145, g: 0, b: 211 }, { r: 157, g: 48, b: 118 }, { r: 255, g: 0, b: 255 }, { r: 204, g: 27, b: 126 }],
	fps: 10,
	transition: MatrixAnimationTransition.None
});

