import { test, expect } from '@playwright/test';

async function createListItem (page, text){
    const toDo = page.locator('input.new-todo')
    await toDo.fill(text)
    await toDo.press('Enter')
}

test.describe('to do list',function(){
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc')
    })

    test('adding an item to the todo list should create a new todo list item', async function({ page }) {
        // open the browser to the web page
        // input class new-todo
        await createListItem(page, 'Hello')
        const listItem = page.locator('li[data-testid="todo-item"]')
        await expect(listItem).toBeVisible()
    })
    test('Click x to remove item from list', async function({ page }){
        await createListItem(page, 'Hello')
        const deleteButton = page.locator('button.destroy')
        const listItem = page.locator('li[data-testid="todo-item"]')
        await deleteButton.click()
        await expect(listItem).not.toBeVisible()    
    })
    test('clicking the checkmark next to a list item reduces the items left value to 0', async function({ page }) {
        await createListItem(page, 'Hello')
        // complete the item by clicking the check mark
        const firstTogToDo = page.getByTestId('todo-item').nth(0)
        await firstTogToDo.getByRole('checkbox').check()
        await expect(firstTogToDo).toHaveClass('completed')
        // get the "X items left" element
        const itemCount = page.locator('.todo-count')
        await expect(itemCount).toContainText('0 items left')
        // validate the text value of that element
    })
    test('Show items selected via filter', async function ({ page }) {
        await createListItem(page, 'stayin out the way')
        await createListItem(page, 'nah forreal')
        const firstTogToDo = page.getByTestId('todo-item').nth(0)
        await firstTogToDo.getByRole('checkbox').check()      
        await expect(firstTogToDo).toHaveClass('completed')
        const secTogToDo = page.getByTestId('todo-item').nth(1)
        await secTogToDo.getByRole('checkbox').check()      
        await expect(secTogToDo).toHaveClass('completed')
        await expect(firstTogToDo).toHaveClass('completed');
        await expect(secTogToDo).toHaveClass('completed');
        const activeLink = page.getByRole('link', {name: 'Active'})
        const completedLink = page.getByRole('link', {name: 'Completed'})
        await activeLink.click()
        await expect(activeLink).toHaveClass('selected')
        await completedLink.click()
        await expect(completedLink).toHaveClass('selected')
    })
    test.only('Check all Button', async function ({ page }) {
        const checkAll = page.getByLabel('Mark all as complete')
        await createListItem(page, 'stayin out the way')
        await createListItem(page, 'nah forreal')
        await checkAll.check()
        await page.pause()
        await checkAll.uncheck()
        await page.pause()
    })
})