export function replaceSlide({ duration = 500, pixels = 50} = {}) {
		function send(node) {
			return function() {
				let top = node.offsetTop - parseFloat(getComputedStyle(node).marginTop);
				let left = node.offsetRight;
				return {
					duration,
					css(t, u) {
						// Remove the element from the normal flow so that it doesn't interfere with the
						// placement of the new element, but position it exactly where it was.
						return `position:absolute;top:${top}px;left:${left}px;opacity:${t};transform:translateY(-${Math.floor(pixels*u)}px)`;
					}
				}
			}
		}

		function receive(node) {
			return function() {
				return {
					duration,
					css(t, u) {
						return `transform:translateY(${Math.floor(pixels*u)}px);opacity:${t}`;
					}
				}
			}
		}
		
		return [send, receive];
	}


