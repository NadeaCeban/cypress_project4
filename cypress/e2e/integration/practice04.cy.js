/// <reference types="cypress"/>

import TodoAppVerification from "../../../pages/TodoAppVerificationPage";
const todoAppVerification = new TodoAppVerification

describe('Project04 - Todo-App Modal', () => {
  beforeEach(() => {
    cy.visit('https://www.techglobal-training.com/frontend/project-6');
  })
  it('Test Case 01 - Todo-App Modal Verification', () => {
/*
Navigate to https://techglobal-training.com/frontend/project-6.
Confirm that the todo-app modal is visible with the title “My Tasks.”
Validate that the New todo input field is enabled for text entry.
Validate ADD button is enabled.
Validate Search field is enabled.
Validate that the task list is empty, displaying the message “No tasks found!”
*/
todoAppVerification.getToDoAppTitle().should('be.visible').and('contain','My Tasks')
todoAppVerification.getNewTodoInputField().should('be.enabled')
todoAppVerification.getAddButton().should('be.enabled')
todoAppVerification.getSearchField().should('be.enabled')
todoAppVerification.getMassage().should('have.text','No tasks found!')
})
  it('Test Case 02 - Single Task Addition and Removal', () => {
/* 
Navigate to https://techglobal-training.com/frontend/project-6
Enter a new task in the todo input field and add it to the list.
Validate that the new task appears in the task list.
Validate that the number of tasks in the list is exactly one.
Mark the task as completed by clicking on it.
Validate item is marked as completed.
Click on the button to remove the item you have added.
Remove the completed task by clicking the designated removal button.
Validate that the task list is empty, displaying the message “No tasks found!”.
*/
todoAppVerification.getNewTodoInputField().type('task')
todoAppVerification.getAddButton().click()
todoAppVerification.getTaskList().should('be.visible')
todoAppVerification.getTaskList().should('have.text','task').and('have.length', 1)
todoAppVerification.getTaskList().click()
todoAppVerification.getItemMarked().should('be.visible')
todoAppVerification.getRemoveButton().click()
todoAppVerification.getMassage().should('have.text','No tasks found!')
})

it('Test Case 03 - Multiple Task Operations', () => {
  /*
Navigate to https://techglobal-training.com/frontend/project-6
Enter and add 5 to-do items individually.
Validate that all added items match the items displayed on the list.
Mark all the tasks as completed by clicking on them.
Click on the “Remove completed tasks!” button to clear them.
Validate that the task list is empty, displaying the message “No tasks found!”.
   */
 const todoLists = ['task1','task2','task3','task4','task5']
 todoLists.forEach(todoList => {
 todoAppVerification.getNewTodoInputField().type(todoList + `{enter}`).clear()
 })

todoAppVerification.getTaskList().each(($el,index) => {
 cy.wrap($el).should('contain',todoLists[index])
 })

 todoAppVerification.getTaskList().each(($el ,index) => {
  cy.wrap($el).click(index).should('be.visible')
 })
 todoAppVerification.getRemoveButton().click()
 todoAppVerification.getMassage().should('have.text','No tasks found!')

})
it('Test Case 04 - Search and Filter Functionality in todo App',() =>{
  /*
Navigate to https://techglobal-training.com/frontend/project-6
Enter and add 5 to-do items individually.
Validate that all added items match the items displayed on the list.
Enter the complete name of the previously added to-do item into the search bar.
Validate that the list is now filtered to show only the item you searched for.
Validate that the number of tasks visible in the list is exactly one.
  */
const todoLists = ['task1','task2','task3','task4','task5']
todoLists.forEach(todoList => {
todoAppVerification.getNewTodoInputField().type(todoList + `{enter}`).clear()
})

todoAppVerification.getTaskList().should('be.visible').and('have.length','5')
todoAppVerification.getSearchField().type('task1')
todoAppVerification.getAddButton().click()
todoAppVerification.getTaskList().should('be.visible')
.and('have.text','task1')
.and('have.length','1')

})
it('Test Case 05 - Task Validation and Error Handling', () => {
  /*
Navigate to https://techglobal-training.com/frontend/project-6
Attempt to add an empty task to the to-do list.
Validate that the task list is empty, displaying the message “No task found!”.
Enter an item name exceeding 30 characters into the list.
Validate error message appears and says “Error: Todo cannot be more than 30 characters!”.
Add a valid item name to the list.
Validate that the active task count is exactly one.
Try to enter an item with the same name already present on the list.
Validate that an error message is displayed, indicating “Error: You already have {ITEM} in your todo list.”.
  */
todoAppVerification.getNewTodoInputField()
todoAppVerification.getAddButton().click()
todoAppVerification.getMassage().should('have.text','No tasks found!')
todoAppVerification.getNewTodoInputField().type('cdfsegtju,kultuyaszsfvhmuxdyrtsfg')
todoAppVerification.getAddButton().click()
todoAppVerification.getErrorMasage().should('have.text','Error: Todo cannot be more than 30 characters!')
todoAppVerification.getNewTodoInputField().clear().type('item')
todoAppVerification.getAddButton().click()
todoAppVerification.getTaskList().should('be.visible').and('have.length','1')
todoAppVerification.getNewTodoInputField().clear().type('item')
todoAppVerification.getAddButton().click()
todoAppVerification.getErrorMasage().should('have.text','Error: You already have item in your todo list.')
})
})