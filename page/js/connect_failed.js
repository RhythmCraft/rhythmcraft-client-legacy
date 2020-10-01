window.onload = () => {
    document.getElementById('reconnect').onclick = () => {
        require('electron').remote.app.relaunch();
        require('electron').remote.app.exit();
    }
    document.getElementById('close').onclick = () => {
        require('electron').remote.app.exit();
    }
}