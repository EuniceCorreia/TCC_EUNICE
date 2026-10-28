using System.Collections;
using System.IO;
using UnityEngine;
using UnityEngine.UI;

public class RegisterController : MonoBehaviour
{
    private const string QR_DIR = "usuarios";
    private const float FILE_SAVED_MSG_DURATION = 2f;
    private static readonly Color MISSING_NAME_COLOR = new Color(0.4f, 0f, 0f, 0.5f);
    private static readonly Color FILE_SAVED_COLOR = new Color(0, 1, 0);

    [SerializeField] private GoogleSheetsController sheetsController;
    [SerializeField] private NarratorRegisterController narratorController;
    [SerializeField] private QrCodeGenerator qrCodeGenerator;
    [SerializeField] private GameObject registerObj, qrCodeObj, btConcludeObj;
    [SerializeField] private AudioSource registerAudio;
    [SerializeField] private Text inputTxt, saveFileButtonTxt, errorTxt,
    placeHolderTxt;
    [SerializeField] private RawImage qrCodeImg;
    // False while the narrator explains why the last attempt failed
    private bool canRegister = true;
    private string lastRegisteredName;

    void Start()
    {
        string errorMessage;
        if (!sheetsController.TryStartSheets(out errorMessage))
            ErrorMode(errorMessage);
    }

    public void TryRegisterPlayer() // Called by Button
    {
        if (!canRegister) return;
        string name = inputTxt.text.ToLower();

        if (string.IsNullOrEmpty(name)) warnMissingName();
        else if (sheetsController.FindUser(name) < 0) RegisterPlayer(name);
        else WarnAlreadyRegistered();
    }

    private void RegisterPlayer(string name)
    {
        lastRegisteredName = name;
        if (sheetsController.CreateEntry(Player.NewPlayerRow(name))) {
            try {
                int playerId = sheetsController.FindUser(name) + 1;
                qrCodeGenerator.GenerateQrCode(playerId.ToString());
                StartCoroutine(SetQrCodeMode());
            }
            catch (System.Exception ex) { ErrorMode(ex.Message); }
        }
        narratorController.playUserRegisteredAudio();
    }

    private void warnMissingName()
    {
        canRegister = false;
        StartCoroutine(InsertNameEffect());
        narratorController.playTypeUserAudio();
    }

    private void WarnAlreadyRegistered()
    {
        canRegister = false;
        narratorController.playAlreadyRegisteredAudio();
        this.InvokeAfter(
            narratorController.AlreadyRegAudioLength, () => canRegister = true
        );
    }

    private IEnumerator SetQrCodeMode()
    {
        registerAudio.Play();
        registerObj.SetActive(false);
        qrCodeObj.SetActive(true);
        yield return new WaitForSeconds(narratorController.UserRegAudioLength);
        btConcludeObj.SetActive(true);
    }

    private IEnumerator InsertNameEffect()
    {
        Color original = placeHolderTxt.color;
        placeHolderTxt.color = MISSING_NAME_COLOR;
        yield return new WaitForSeconds(narratorController.TypeUserAudioLength);
        placeHolderTxt.color = original;
        canRegister = true;
    }

    public void SaveQrCode() // Called by Button
    {
        Texture2D texture2D = (Texture2D) qrCodeImg.texture;
        Directory.CreateDirectory(QR_DIR);
        File.WriteAllBytes(
            $"{QR_DIR}/{lastRegisteredName}.png", texture2D.EncodeToPNG()
        );
        StartCoroutine(FileSavedMsg());
    }

    private IEnumerator FileSavedMsg()
    {
        string originalTxt = saveFileButtonTxt.text;
        Color originalColor = saveFileButtonTxt.color;

        saveFileButtonTxt.text = "Arquivo salvo";
        saveFileButtonTxt.color = FILE_SAVED_COLOR;
        yield return new WaitForSeconds(FILE_SAVED_MSG_DURATION);
        saveFileButtonTxt.text = originalTxt;
        saveFileButtonTxt.color = originalColor;
    }

    public void ErrorMode(string msg)
    {
        errorTxt.text = msg;
        errorTxt.transform.parent.gameObject.SetActive(true);

        // Hides the register form; its last child is the quit button
        Transform regTransform = registerObj.transform;
        for (int i = 0; i < regTransform.childCount - 1; i++)
            regTransform.GetChild(i).gameObject.SetActive(false);
    }
}
