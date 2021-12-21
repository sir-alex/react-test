global.beforeEach(() => {
    delete window.location;
    window.location = Object.create(window);
    window.location.assign = jest.fn();
});
