define(
  ['postmonger'],
  function(Postmonger) {
    'use strict';
    var connection = new Postmonger.Session();
    var payload = {};
    $(window).ready(onRender);
    connection.on('initActivity', initialize);
    connection.on('clickedNext', save);
    connection.on("requestedTokens", onGetTokens);
    function onGetTokens(tokens) {
      console.log(tokens);
    }
    function onRender() {
      connection.trigger('ready');
      connection.trigger("requestTokens");
    }
    function initialize(data) {
      if (data) {
        payload = data;
        var setSurveyID = payload['arguments'].execute.inArguments[0].surveyID;
        $('#surveyID').val(setSurveyID);
      }
    }
    function save() {
      var surveyID = $('#surveyID').val();
      payload['arguments'].execute.inArguments = [{
        "subscriberKey": "{{Contact.Key}}",
        "surveyID": surveyID,
        "firstName":"{{Event.AutomationAud-6862336a-850d-f56e-74ff-b4a02b9f8eae.firstName}}",
        "lastName":"{{Event.AutomationAud-6862336a-850d-f56e-74ff-b4a02b9f8eae.lastName}}",
        "accountID":"{{Event.AutomationAud-6862336a-850d-f56e-74ff-b4a02b9f8eae.accountID}}"
      }];
      payload['metaData'].isConfigured = true;
      console.log(payload);
      connection.trigger('updateActivity', payload);
    }
  }
);