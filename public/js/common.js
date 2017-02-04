/**
 * Created by Gourav on 04/02/17.
 */

function postCall (url , postData){
  try {
    $.post(url, postData)
      .done(function (data) {
        window.alert('Request Generated: ' + url);
        location.reload();
      })
      .fail(function (error) {
        window.alert('Failed: ' + url + ' | Returned with:' +  error.responseText);
        location.reload();
      })
  } catch (e) {
    console.log('Failed: ' + url);
  }
}


function newRequest() {

  var c = document.getElementsByTagName('input')[0].value;

  if(c && c.length){
  var data = {
    customerId: c
  };
  postCall('/api/newRequest',data);
  }else {
    window.alert("Please provide Customer Id.");
  }
}


function assignRide(id, reqId) {
  var data = {
    driver: id,
    id: reqId
  };
  postCall('/api/assignRequest',data);
}
