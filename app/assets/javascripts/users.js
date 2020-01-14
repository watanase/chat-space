$(function(){

  var user_list = $("#user-search-result");

  function appendUser(user) {
    var html =`
            <div class="chat-group-user clearfix">
              <p class="chat-group-user__name">
                ${user.name}
              </p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
            </div>`
    user_list.append(html);
  }
  function appendNoUser(user) {

    var html = `
            <div class="chat-group-user clearfix">
             <p class="chat-group-user__name">ユーザーが見つかりません</p>
            </div>`
    user_list.append(html);
  }
  function appendMember(name, id) {
    var html = `
            <div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value="${id}">
              <p class='chat-group-user__name'>${name}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${id}" data-user-name="${name}" >削除</div>
            </div>
            `
    $('#chat-group-users').append(html)
  }
  function deleteMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
  $('#user-search-field').on('keyup', function(event) {
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: "/users",
      dataType: 'json',
      data: { keyword: input },
    })
    .done(function(users){
      user_list.empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        appendNoUser();
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    });
  });
  $(document).on('click','.chat-group-user__btn--add', function(){
    var userId = $(this).attr('data-user-id');
    var userName = $(this).attr('data-user-name');
    $(this).parent().remove();
    appendMember(userName, userId);
    deleteMember(userId);
  });
  $(document).on('click','.chat-group-user__btn--remove', function(){
    $(this).parent().remove();
  })
});