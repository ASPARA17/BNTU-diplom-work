

function initTab() {
  var example1 = new BSTable("example", {
    onDelete:function() {
      deleteGroup();
    }
  });

  example1.init();
}


