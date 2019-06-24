var API_ENDPOINT = " https://gkeno8fi0j.execute-api.us-east-1.amazonaws.com/dev"

function postData(url = ``, data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses response to JSON
}

fetch(API_ENDPOINT)
	.then(function(response) {
		return response.json();
	})
	.then(function(myJson) {
		console.log(JSON.stringify(myJson));

    for(i=0;i<myJson.length;i++){
    	var data = myJson[i]
      var player
      if(data['url'] !== "processing"){
      player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>"
    }else{
      player="processing"
    }
      $("#posts").append("<tr> \
                <td>" + data['title'] + "</td> \
                <td>" + data['text'] + "</td> \
                <td>" + player + "</td>  \
                </tr>");
    }
	});

document.getElementById("sayButton").onclick = function(){

	var inputData = {
		"title": $('#tval').val(),
		"text" : $('#postText').val()
	};

	postData(API_ENDPOINT, inputData)
  .then(data => console.log(JSON.stringify(data)))
	.then(()=> {console.log('posted')
      $('#postText').val('')
      $('#tval').val('')}) // JSON-string from `response.json()` call location.reload()
  .catch(error => console.error(error));

}


document.getElementById("searchButton").onclick = function(){

	$("#posts").text("")

	fetch(API_ENDPOINT)
	  .then(function(response) {
	    return response.json();
	  })
	  .then(function(myJson) {
	    console.log(JSON.stringify(myJson));

      for(i=0;i<myJson.length;i++){
        var data = myJson[i]
        var player
        if(data['url'] !== "processing"){
        player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>"
      }else{
        player="processing"
      }
        $("#posts").append("<tr> \
                  <td>" + data['title'] + "</td> \
                  <td>" + data['text'] + "</td> \
                  <td>" + player + "</td>  \
                  </tr>");
      }
	  });
}

document.getElementById("postText").onkeyup = function(){
	var length = $(postText).val().length;
	document.getElementById("charCounter").textContent="Characters: " + length;
}
