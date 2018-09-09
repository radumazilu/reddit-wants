import $ from 'jquery';
export const postBodies = $.get('', function(data) {
  console.log(data);
});
