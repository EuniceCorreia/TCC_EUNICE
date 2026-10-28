import { wordsFor, imageFolderFor } from './word-catalog.js';
import { setCookie } from '../game/cookies.js';

/**
 * Lógica da tela de seleção de tema/dificuldade.
 */

let selectedTheme = document.querySelector('input[name="radios2"]:checked')?.value ?? '1';
let selectedDifficulty = document.querySelector('input[name="radios"]:checked')?.value ?? 'true';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.addEventListener('change', handleOptionChange);
    });

    document.getElementById('boardBtn')?.addEventListener('click', handlePlayButtonClick);
    document.getElementById('returnBtn1')?.addEventListener('click', logout);
});

function handleOptionChange() {
    selectedTheme = document.querySelector('input[name="radios2"]:checked').value;
    selectedDifficulty = document.querySelector('input[name="radios"]:checked').value;
}

async function handlePlayButtonClick() {
    const microphoneGranted = await ensureMicrophoneAccess();

    if (!microphoneGranted) {
        return;
    }

    startGameWithSelection();
}

async function ensureMicrophoneAccess() {
    const status = await navigator.permissions.query({ name: 'microphone' });

    if (status.state === 'granted') {
        return true;
    }

    if (status.state === 'denied') {
        alert('O microfone está bloqueado no navegador. Vá nas configurações do site e libere.');
        return false;
    }

    const granted = await requestMicrophonePermission();
    if (!granted) {
        alert('Você precisa permitir o microfone para jogar.');
    }

    return granted;
}

async function requestMicrophonePermission() {
    try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        return true;
    } catch (error) {
        console.error('Permissão de microfone negada:', error);
        return false;
    }
}

function startGameWithSelection() {
    const words = wordsFor(selectedTheme, selectedDifficulty);
    const imageFolder = imageFolderFor(selectedTheme, selectedDifficulty);

    setCookie('imgFolder', imageFolder);
    setCookie('filaPalavras', JSON.stringify(words));
    setCookie('dificuldadeValue', selectedDifficulty);

    window.location.href = 'game.php';
}

function logout() {
    window.location.href = 'logout.php';
}
