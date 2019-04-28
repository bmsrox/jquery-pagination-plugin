(function($){

  var getPagination = function (total, recordsPerPage, currentPage, max_links) {
	
    if (total <= recordsPerPage) {
        return false;
    }
    
    var page = currentPage || 1;
    var pages = Math.ceil(total/recordsPerPage);
    var pagination = [];
    
    if (page > 1) {
      pagination.push({page:1, value: '««'});
      pagination.push({class: 'previous', page: page - 1, value: '«'});
    }

    for(prev_page = page - max_links; prev_page <= page - 1; prev_page++){
      if(prev_page >= 1){
        pagination.push({page: prev_page, value: prev_page});
      }
    }
    
    pagination.push({class: 'active', page: page, value: page});
      
    for (next_page = page + 1; next_page <= page + max_links; next_page++) {
      if(next_page <= pages){
        pagination.push({page: next_page, value: next_page});
      }
    }

    if (page != pages) {
      pagination.push({class: 'forward', page: page + 1, value: '»'});
      pagination.push({page: pages, value: '»»'});
    }

    return pagination;
  }

  $.fn.pagination = function (options) {
    var settings = $.extend({
      total: 0,
      recordsPerPage: 10,
      currentPage: 1,
      maxLinks: 4,
      options:{
        dataAttributes: {}
      }
    }, options);

    var pages = getPagination(
      parseInt(settings.total),
      parseInt(settings.recordsPerPage),
      parseInt(settings.currentPage),
      parseInt(settings.maxLinks)
    );

    var dataAttributes = settings.options.dataAttributes;
  
    return this.each(function(idx, elem){

      elem.innerHTML = "";
  
      if (!pages) {
        return ;
      }

      pages.map(function(item){
        var li = document.createElement('li');
        if (item.class) li.className = item.class;
        
        li.dataset.page = item.page;
        Object.keys(dataAttributes).map(function(n){
          li.dataset[n] = dataAttributes[n];
        })
        
        var link = document.createElement('a');
            link.href = "#";
            link.innerHTML = item.value;

        li.appendChild(link);
        
        elem.append(li);
      })
      
    });
  }
})(jQuery)