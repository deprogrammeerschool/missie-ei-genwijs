(() => {
    const HIDDEN_CLASS = 'is-hidden';
    const VISIBLE_CLASS = 'is-visible';
    const CHECKING_CLASS = 'is-checking';

    const ANSWERS = {
        1: [
            'kuikentje',
            'Kuikentje',
            'KUIKENTJE
        ]
        2: '19',
        3: [
            'lente',
            'Lente',
            'LENTE'
        ]
        4: [
            'lammetje',
            'Lammetje',
            'LAMMETJE
        ]
        5: [
            'paasei',
            'Paasei',
            'PAASEI'
        ]
    }

    const forms = document.querySelectorAll('form');
    const doors = document.querySelectorAll('.js-door-open');
    const dialogs = document.querySelectorAll("dialog");
    const openDialogButtons = document.querySelectorAll(".js-open-dialog-button");
    const closeDialogButtons = document.querySelectorAll("dialog .close-button");
    const checkButtons = document.querySelectorAll('.js-check-button');
    const answers = document.querySelectorAll('.js-answer');
    const lockContainers = document.querySelectorAll('.js-lock-container');
    const locks = document.querySelectorAll('.js-lock');
    const unlocks = document.querySelectorAll('.js-un-lock');
    const redLocks = document.querySelectorAll('.js-lock-red');
    const hints = document.querySelectorAll('[data-hint]');
    const lastDoor = document.querySelector('[data-door="6"]');
    const firstDoor = document.querySelector('[data-door="1"]');

    checkIfDoorHasBeenOpened();

    if (lastDoor.classList.contains('can-open')) {
        localStorage.clear();
        doors.forEach((door) => {
            door.classList.remove('is-open')
            door.classList.remove('can-open')
            firstDoor.classList.add('can-open')
        });
    }

    forms.forEach(form => {
        form.onkeydown = (event) => {  
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        }
    })

    openDialogButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const dataAttrValue = button.dataset.button;
            const correspondingDialog = Array.from(dialogs).find(dialog => dialog.dataset.dialog === dataAttrValue)
            correspondingDialog.showModal();
        })
    })

    closeDialogButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const dataAttrValue = button.dataset.close;
            const correspondingDialog = Array.from(dialogs).find(dialog => dialog.dataset.dialog === dataAttrValue)
            correspondingDialog.close();
        })
    })

    doors.forEach((door) => {
        door.addEventListener('click', () => {
            if (door.classList.contains('can-open')) {
                door.classList.add('is-open')
            }
        })
    });

    checkButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dataAttrValue = button.dataset.check;
            const correspondingDialog = Array.from(dialogs).find(dialog => dialog.dataset.dialog === dataAttrValue);
            const correspondingLockContainer = Array.from(lockContainers).find(container => container.dataset.container === dataAttrValue);
            const correspondingLock = Array.from(locks).find(lock => lock.dataset.lock === dataAttrValue);
            const correspondingRedLock = Array.from(redLocks).find(lock => lock.dataset.redlock === dataAttrValue);
            const correspondingUnlock = Array.from(unlocks).find(lock => lock.dataset.unlock === dataAttrValue);
            const correspondingAnswer = Array.from(answers).find(answer => answer.dataset.input === dataAttrValue);
            const nextDoor = Array.from(doors).find(door => door.dataset.door === (Number(dataAttrValue) + 1).toString());

            correspondingLockContainer.classList.add(CHECKING_CLASS);
            addHiddenClass(correspondingRedLock);
            removeVisibleClass(correspondingRedLock);
            addVisibleClass(correspondingLock);

            if (correspondingAnswer.value === ANSWERS[Number(dataAttrValue)]) {
                setTimeout(() => {
                    addHiddenClass(correspondingLock);
                    removeVisibleClass(correspondingLock);
                    addHiddenClass(correspondingRedLock);
                    removeVisibleClass(correspondingRedLock)
                    removeHiddenClass(correspondingUnlock);
                    localStorage.setItem(dataAttrValue, correspondingAnswer.value)
                }, "1400");
                setTimeout(() => {
                    correspondingDialog.close();
                }, "2600");
                setTimeout(() => {
                    nextDoor.classList.add('can-open')
                }, "3100");
            } else {
                setTimeout(() => {
                    setTimeout(() => {
                        addHiddenClass(correspondingLock);
                        removeVisibleClass(correspondingLock);
                        addVisibleClass(correspondingRedLock);
                    }, "500");
                    setTimeout(() => {
                        correspondingLockContainer.classList.remove(CHECKING_CLASS);
                    }, "1900");
                }, "800")
            }
        })
    });

    hints.forEach(hint => {
        const button = hint.querySelector('[data-button]');
        const text = hint.querySelector('[data-text]');

        button.addEventListener('click', () => {
            addVisibleClass(text);
            removeHiddenClass(text);
        })
    })

    function addHiddenClass(element) {
        element.classList.add(HIDDEN_CLASS);
    }

    function removeHiddenClass(element) {
        element.classList.remove(HIDDEN_CLASS);
    }

    function addVisibleClass(element) {
        element.classList.add(VISIBLE_CLASS);
    }

    function removeVisibleClass(element) {
        element.classList.remove(VISIBLE_CLASS);
    }

    function checkIfDoorHasBeenOpened() {
        const items = { ...localStorage };
        console.log(items)

        doors.forEach((door) => {
            const dataAttrValue = door.dataset.door;
            const nextDoor = Array.from(doors).find(door => door.dataset.door === (Number(dataAttrValue) + 1).toString());
            if (door.getAttribute('data-door') in localStorage) {
                door.classList.add('is-open')
                nextDoor.classList.add('can-open')
            }
        });
    } 

})();
