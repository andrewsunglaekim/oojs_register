function Register(){
  this.entries = [];
  this.total = 0;
}

Register.prototype = {
  addEntry: function(amount){
    this.entries.push(amount);
    this.total += amount;
  }
}

function RegisterView(register){
  this.register = register
  this.entriesContainer = $(".register")
  this.totalEl = $(".total")
  this.form = $(".enter form")
}

RegisterView.prototype = {
  render: function(){
    this.addFormListener()
    this.renderEntries()
    this.renderTotal()
  },
  addFormListener: function(){
    var self = this
    this.form.on("submit", function(evt){
      evt.preventDefault()
      amount = parseFloat($(this).find("input").val())
      $(this).find("input").val('')
      self.register.addEntry(amount)
      self.renderEntries()
      self.renderTotal()
    })
  },
  renderEntries: function(){
    this.entriesContainer.empty()
    var entries = this.register.entries
    for (var i = 0; i < entries.length; i++){
      this.entriesContainer.append($("<div class='entry'>" + entries[i] + "</div>"))
    }
  },
  renderTotal: function(){
    this.totalEl.html(this.register.total)
  }
}

$(document).ready(function(){
  var register = new Register()
  var registerView = new RegisterView(register)
  registerView.render()
})
