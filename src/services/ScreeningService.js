let _singleton = Symbol();

class ScreeningService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ScreeningService(_singleton);
        return this[_singleton]
    }

    getScreenings(movieId) {
        return fetch('https://moviewalk.herokuapp.com/api/' + movieId + '/screenings', {
            credentials: 'include'
        }).then(response => response.json());


    }

    deleteScreening(screeningId){

        return fetch('https://moviewalk.herokuapp.com/api/screening/'+screeningId,{
            method:'delete',
            credentials: 'include'});
    }

}
export default ScreeningService;
