var DANEBOOK = DANEBOOK || {}
DANEBOOK.Comments = DANEBOOK.Comments || {}
DANEBOOK.Comments.View = (function($){

  var _addCommentToggleListener = function() {
    $(document).on("click", ".post .toggle-comment-form", function(e){
      $(e.target).next().slideDown(500);
    });
  }

  var init = function() {
    _addCommentToggleListener();
  }

  return {
    init: init
  }

})($);
