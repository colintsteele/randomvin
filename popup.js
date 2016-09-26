chrome.storage.sync.get(function(data){
  var maxVins = 5;
  var vins = data&&data.vins ? data.vins : [];

  $(document).ready(function(){

    var $template = $('#vins>li:first');

    $('.input-group-addon').on('click', function(){
        copyToClipboard( $(this).parents('li:first').find('input') );
    }).click();

    $('#refresh').on('click', function(){
      $('li:not(:first)').remove();
      vins = [];
      chrome.storage.sync.set({vins:[]});
    });

    function renderVin(vin, click){
      var $clone = $template.clone(true);
      $clone.find('input').val(vin);
      $template.after($clone);
      click && $clone.find('.input-group-addon').click();
      return $clone;
    }

    $('#getVin').on('click', function(){
      $.get('http://randomvin.com/getvin.php?type=real', function(data){
        //$('.vin-field').val(data);
        storeVin(data);
        renderVin(data);
      });
    });

    function storeVin(vin) {
      vins.push(vin);

      if(vins.length > maxVins) {
        vins.shift();
      }
      chrome.storage.sync.set({vins:vins});
    }

    function copyToClipboard(input) {
      //var copyArea = $('.VinResult').first();
      input.select();
      document.execCommand('copy');
    }

    for(var vin in vins){

        renderVin(vins[vin]);
    }

  });



});
