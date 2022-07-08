
(() => {
    
    console.log('fired! javascript is eating dimsum!');

    // Step 1: go and find the elemetns on the page that you want the user to interact with

    // querySelector takes a CSS selector and uses that to find a match in the HTML file

    // let theBadge = document.querySelector('#png'),
    //     theVector = document.querySelector('#vector');
    // querySelector finds the first element that matches

    // querySelectorAll finds ALL elements that match the selector
    // and returns back an array-like object called a node list
    let thedimsum = document.querySelectorAll('img'),
        theAudio = document.querySelector('audio');
		gameBoard = document.querySelector('.puzzle-board'),
		pzlPieces = document.querySelectorAll('.puzzle-pieces img'),
		dropZones = document.querySelectorAll('.drop-zone');


    
    function allowPlay(event) {
        event.preventDefault();
        event.dataTransfer.setData('draggedMusic', this.id);

        let droppedMusicId = event.dataTransfer.getData('draggedMusic');
        this.appendChild(document.querySelector(`#${droppedMusicId}`));
    }
        
    function loadAudioTrack() {
        // change the audio element's source attribute
        theAudio.src = `audio/${this.dataset.trackref}.mp3`;

        // run the load and play media methods
        theAudio.load();

        playAudio();
        
    }

    function playAudio() { theAudio.play(); }

   
    
    function allowDrag(event) {
		console.log('started draggin me');

		// create a reference to the element we're dragging so we can retrieve it later
		event.dataTransfer.setData('draggedEl', this.id);
	}

	function allowDragOver(event) {
		// override default behaviour on certain elements when an event happens
		event.preventDefault();
		console.log('started draggin over me');
	}

	function allowDrop(event) {
		event.preventDefault();
		let droppedElId = event.dataTransfer.getData('draggedEl');
        if (this.childElementCount > 0) { return }

		// retrieve the dragged el by its ID, and then put it inside the current drop zone
		this.appendChild(document.querySelector(`#${droppedElId}`));

		// MDN JavaScript template string
	}

   

	// how to we want the user to interact with the elements that we collected earlier?
	// events are things like clikcs, drags, double-clicks, keypresses... all the ways that a user can interact with a mouse, a keyboard etc
 
	
	pzlPieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));


    // figure out how you want the user to interact with the badge graphic - a click, mouseover, mouseout, double click etc
    // theBadge.addEventListener('click', logMyId);
    // theVector.addEventListener('click', logMyId);

    // for each badge in our collection, add an event handler
    // arrow functions are just shorthand function declarations
    
    thedimsum.forEach(thumb => thumb.addEventListener('click', loadAudioTrack));

    dropZones.forEach(zone => {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
        zone.addEventListener('drop', allowPlay);
	});

})();