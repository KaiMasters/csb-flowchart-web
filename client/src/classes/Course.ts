export default {

  id: String,
  information: Object,
  view: Object,

  constructor: (data) => {
    this.id = data.id;
    this.information = data.information;
    this.view = data.view; 
  }

}