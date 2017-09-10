import React, { Component } from 'react';
import './gifList.css';
import './randomGifList.css';

class RandomGifList extends Component {

  render() {
		const random = this.props.randomGifs;
		console.log(random);
		console.log(Object.keys(random).length === 0);
    return (
      <div className="gif-list-container">
				<ul>
				{
					Object.keys(random).length === 0
						? null
						: <li
							key={random.id}
							className="gif-item-parent"
						>
							<img
								src={random.fixed_width_downsampled_url}
								alt="Gif"
								className="gif-item-img"
							/>
						</li>
				}
				</ul>
      </div>
    );
  }
}

export default RandomGifList;
