var current_x = 0;
var current_y = 0;




async function startProgram() {
	var target_x = 50;
	var target_y = 50;
	var old_x = 0
	var old_y = 0
//	const maxDistance = calculateDistance(0, 0, target_x, target_y);
	

	//await speak('This is the max distance!', true);
	//await delay(1);


	var new_distance = calculateDistance(old_x, old_y, target_x, target_y);
	var maximumDistance = new_distance*1.1;
	await speak(buildString(maximumDistance));
	//await speak("This is the distance variable");
	//await speak(buildString(new_distance));
	
	while (new_distance > 10) {
		old_x = getLocation().x;
		old_y = getLocation().y;
		new_distance = calculateDistance(old_x, old_y, target_x, target_y);
		await speak(buildString(new_distance));
		await delay(0.25);
		colors = scaleColor(new_distance, maximumDistance);
//		await speak(buildString(colors[0]), true);
//		await speak(buildString(colors[1]), true);
		newColor = { r: colors[0], g: 0, b: colors[1] }
		setMainLed(newColor);
		if (getElapsedTime() > 180){
			await speak("Time is up");
			exitProgram();
		}
	}
	await speak('Nice job!', true);
	playMatrixAnimation(0, true);
}

function scaleColor(distance, maxDistance) {
    const scaledDistance = Math.min(distance/maxDistance, 1.0);
	// await speak(buildString(distance), true);

    
    const redValue = Math.floor((1 - scaledDistance) * 255);
    const blueValue = Math.floor(scaledDistance * 255);
//	await speak(buildString(redValue), true);


    return [redValue, blueValue];
}
function calculateDistance(x, y, xt, yt) {
	distance = Math.sqrt((xt - x)**2 + (yt - y)**2);
	return distance;

}


registerMatrixAnimation({
	frames: [[[6, 6, 6, 6, 6, 6, 6, 6], [6, 6, 6, 6, 6, 6, 6, 6], [1, 1, 1, 6, 6, 1, 1, 1], [1, 1, 1, 6, 6, 1, 1, 1], [1, 1, 1, 6, 6, 1, 1, 1], [1, 1, 1, 6, 6, 1, 1, 1], [1, 1, 1, 6, 6, 1, 1, 1], [1, 1, 1, 6, 6, 1, 1, 1]]],
	palette: [{ r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 }, { r: 255, g: 0, b: 0 }, { r: 255, g: 64, b: 0 }, { r: 255, g: 128, b: 0 }, { r: 255, g: 191, b: 0 }, { r: 255, g: 255, b: 0 }, { r: 185, g: 246, b: 30 }, { r: 0, g: 255, b: 0 }, { r: 185, g: 255, b: 255 }, { r: 0, g: 255, b: 255 }, { r: 0, g: 0, b: 255 }, { r: 145, g: 0, b: 211 }, { r: 157, g: 48, b: 118 }, { r: 255, g: 0, b: 255 }, { r: 204, g: 27, b: 126 }],
	fps: 10,
	transition: MatrixAnimationTransition.None
});

