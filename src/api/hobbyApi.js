import { config } from '../config/config';

class HobbyApi{
	static getAllHobbies(){
		return fetch(`${config.api}/hobbies`).then(response => {
			return response.json();
		}).catch(error => {
			return error;
		});
	}


};
export default HobbyApi;
