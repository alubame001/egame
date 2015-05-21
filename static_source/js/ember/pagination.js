var get = Ember.get, set = Ember.set;

Ember.PaginationMixin = Ember.Mixin.create({
   init: function() {
  //console.log( this.get('content'))
    },

   
  pages: function() {

    var availablePages = this.get('availablePages'),
    pages = [],
    page;

    for (i = 0; i < availablePages; i++) {
          template = this.get('routeTo'),
      page = i + 1;

      
      pages.push({template:this.get('routeTo'), page_id: page.toString() });
    }
    
    return pages;
   
  }.property('availablePages'),

  currentPage: function() {

    return parseInt(this.get('selectedPage'), 10) || 1;

  }.property('selectedPage'),

    isCurrentPageEqualSelectedPage: function() {
      if ( this.get('currentPage') == this.get('selectedPage') )
         {  return true;} 
      else
         {  return false;}  

  }.property('selectedPage','currentPage'),

  nextPage: function() {

    var nextPage = this.get('currentPage') + 1;
    var availablePages = this.get('availablePages');

    if (nextPage <= availablePages) {
        return Ember.Object.create({id: nextPage});
    }else{
        return Ember.Object.create({id: this.get('currentPage')});
    }

  }.property('currentPage', 'availablePages'),

  prevPage: function() {

    var prevPage = this.get('currentPage') - 1;

    if (prevPage > 0) {
        return Ember.Object.create({id: prevPage});
    }else{
        return Ember.Object.create({id: this.get('currentPage')});
    }

  }.property('currentPage'),

  availablePages: function() {

    return Math.ceil((this.get('content.length') / this.get('itemsPerPage')) || 1);
   
  }.property('content.length'),


  paginatedContent: function() {
    var selectedPage = this.get('selectedPage') || 1;
    var upperBound = (selectedPage * this.get('itemsPerPage'));
    var lowerBound = (selectedPage * this.get('itemsPerPage')) - this.get('itemsPerPage');
    var models = this.get('content');
    return models.slice(lowerBound, upperBound);
  }.property('selectedPage', 'content.@each'),

  showTableTh: function() {

    var isShow = this.get('showTableTh');
   
  }.property('showTableTh','isShow'),


 
});
