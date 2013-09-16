	utils = function Utils(){
		
		var sectionLeft = "Left", sectionCenter = "Center", sectionRight = "Right";
		this.parseSectionCinema = function(sectionsRest) {
			
			var sections = new Array();
			if(sectionsRest.left) {
				var section = new Object();
				section.rows = sectionsRest.left.rows;
				section.cols = sectionsRest.left.cols;
				section.name = sectionLeft;
				if(sectionsRest.left.takenSeats) {
					section.takenSeats = sectionsRest.left.takenSeats;
				}
				sections.push(section);
			}
			if(sectionsRest.right) {
				var section = new Object();
				section.rows = sectionsRest.right.rows;
				section.cols = sectionsRest.right.cols;
				section.name = sectionRight;
				if(sectionsRest.right.takenSeats) {
					section.takenSeats = sectionsRest.right.takenSeats;
				}
				sections.push(section);
			}
			if(sectionsRest.center) {
				var section = new Object();
				section.rows = sectionsRest.center.rows;
				section.cols = sectionsRest.center.cols;
				section.name = sectionCenter;
				if(sectionsRest.center.takenSeats) {
					section.takenSeats = sectionsRest.center.takenSeats;
				}
				sections.push(section);
			}
			
			return sections;
		};
	};
	app.utils = new utils();
	