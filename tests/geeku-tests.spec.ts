import { test, expect } from '@playwright/test';
test.describe('to do list',function(){
    test('adding an item to the todo list should create a new todo list item', async function({ page }) {
        // open the browser to the web page
        // input class new-todo
        await page.goto('https://demo.playwright.dev/todomvc')
        const todo = page.locator('input.new-todo')
        await todo.fill('hello')
        await todo.press('Enter')
        const listItem = page.locator('li[data-testid="todo-item"]')
        await expect(listItem).toBeVisible()
    })
    test('Click x to remove item from list', async function({ page }){
        await page.goto('https://demo.playwright.dev/todomvc')
        const todo = page.locator('input.new-todo')
        await todo.fill('hello')
        await todo.press('Enter')
        const deleteButton = page.locator('button.destroy')
        const listItem = page.locator('li[data-testid="todo-item"]')
        await deleteButton.click()
        await expect(listItem).not.toBeVisible()  

        
    })

    test('clicking the checkmark next to a list item reduces the items left value to 0', async function({ page }) {
        await page.goto('https://demo.playwright.dev/todomvc')
        const todo = page.locator('input.new-todo')
        await todo.fill('hello')
        await todo.press('Enter')
        // complete the item by clicking the check mark
        const firsttogtodo = page.getByTestId('todo-item').nth(0)
        await firsttogtodo.getByRole('checkbox').check()
        await expect(firsttogtodo).toHaveClass('completed')
        // get the "X items left" element
        const itemCount = page.locator('.todo-count')
        await expect(itemCount).toContainText('0 items left')
        // validate the text value of that element
      })

    test('Show items selected via filter', async function ({ page }) {
        await page.goto('https://demo.playwright.dev/todomvc')
        const todo = page.locator('input.new-todo')
        await todo.fill('staying out the way')
        await todo.press('Enter')
        await todo.fill('nahh forreal')
        await todo.press('Enter')
        const firsttogtodo = page.getByTestId('todo-item').nth(0)
        await firsttogtodo.getByRole('checkbox').check()      
        await expect(firsttogtodo).toHaveClass('completed')
        await page.pause()
        const sectogtodo = page.getByTestId('todo-item').nth(1)
        await sectogtodo.getByRole('checkbox').check()      
        await expect(sectogtodo).toHaveClass('completed')
        await page.pause()
        await expect(firsttogtodo).toHaveClass('completed');
        await expect(sectogtodo).toHaveClass('completed');
        const activeLink = page.getByRole('link', {name: 'Active'})
        const completedLink = page.getByRole('link', {name: 'Completed'})
        await activeLink.click()
        await expect(activeLink).toHaveClass('selected')
        await page.pause()
        await completedLink.click()
        await expect(completedLink).toHaveClass('selected')
        await page.pause()
    })


    
})