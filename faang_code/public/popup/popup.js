document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');

    // Create a button
    const button = document.createElement('button');
    button.textContent = 'Click me';
    contentDiv.appendChild(button);

    // Add an event listener to the button
    button.addEventListener('click', () => {
        const message = document.createElement('p');
        message.textContent = 'Button clicked!';
        contentDiv.appendChild(message);
    });
});