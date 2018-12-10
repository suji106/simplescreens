let _singleton = Symbol();

class RequestService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new RequestService(_singleton);
        return this[_singleton]
    }

    createRequest(movieId, request) {
        return fetch("https://moviewalk.herokuapp.com/api/" + movieId + "/application", {
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            },credentials: 'include',
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })}


    getRequestStatus(movieId){
        return fetch('https://moviewalk.herokuapp.com/api/'+movieId+'/application',{
            credentials: 'include'}).then(response => response.json());
    }


    getContriRequests(movieId){

        return fetch('https://moviewalk.herokuapp.com/api/'+movieId+'/applications/participants/pending',{
            credentials: 'include'}).then(response => response.json());
    }


    getCriticRequests(movieId){

        return fetch('https://moviewalk.herokuapp.com/api/'+movieId+'/applications/critics/pending',{

            credentials: 'include'}).then(response => response.json());
    }

    getParticipants(movieId){

        return fetch('https://moviewalk.herokuapp.com/api/'+movieId+'/applications/participants/accepted',{

            credentials: 'include'}).then(response => response.json());
    }
    getCritics(movieId){

        return fetch('https://moviewalk.herokuapp.com/api/'+movieId+'/applications/critics/accepted',{

            credentials: 'include'}).then(response => response.json());
    }


    acceptRequest(requestId){

        return fetch('https://moviewalk.herokuapp.com/api/application/accepted/'+requestId,{
            method:'PUT',
            credentials: 'include'}).then(response => response.json());
    }

    rejectRequest(requestId){

        return fetch('https://moviewalk.herokuapp.com/api/application/rejected/'+requestId,{
            method:'PUT',
            credentials: 'include'}).then(response => response.json());
    }

    deleteRequest(requestId){

        return fetch('https://moviewalk.herokuapp.com/api/application/'+requestId,{
            method:'delete',
            credentials: 'include'});
    }

}
export default RequestService;
