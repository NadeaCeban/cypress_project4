class TodoAppVerification {

  //Locator
getToDoAppTitle() {
return cy.get('.panel-heading')
}

getNewTodoInputField() {
return cy.get('#input-add')
}

getAddButton() {
  return cy.get('#add-btn')
}

getSearchField() {
  return cy.get('#search')
}
 getTaskList() {
  return cy.get('.mr-auto')
 
 }
getItemMarked(){
 return cy.get('[style="text-decoration: line-through;"]')
}
   
getRemoveButton() {
  return cy.get('#clear')
}

getMassage() {
  return cy.get('.todo-item > p')
}

getErrorMasage(){
  return cy.get('.notification')
}
}

export default TodoAppVerification