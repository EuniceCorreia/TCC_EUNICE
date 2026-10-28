using System;
using System.Collections;
using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.UI;
using ZXing;

// Reads the player's QR code (which holds the player id) with the webcam
public class WebCamController : MonoBehaviour
{
    private const float ACCESS_EFFECT_DURATION = 1f;
    private static readonly Color ACCESS_COLOR = new Color(0f, 1f, 0f, 1f);

    [SerializeField] private AuthController authController;
    [SerializeField] private AudioController audioController;
    [SerializeField] private RawImage webCamRawImg;
    [SerializeField] private Text qrCodeTxt;
    private static WebCamTexture webCamTexture;
    private BarcodeReaderGeneric barcodeReader;

    private static byte[] Color32ArrayToByteArray(Color32[] colors)
    {
        if (colors == null || colors.Length == 0)
            return null;

        int lengthOfColor32 = Marshal.SizeOf(typeof(Color32));
        int length = lengthOfColor32 * colors.Length;
        byte[] bytes = new byte[length];

        GCHandle handle = default(GCHandle);
        try {
            handle = GCHandle.Alloc(colors, GCHandleType.Pinned);
            IntPtr ptr = handle.AddrOfPinnedObject();
            Marshal.Copy(ptr, bytes, 0, length);
        }
        finally {
            if (handle != default(GCHandle)) handle.Free();
        }

        return bytes;
    }

    void Update()
    {
        if (barcodeReader == null) return;

        Result result = barcodeReader.Decode(
            Color32ArrayToByteArray(webCamTexture.GetPixels32()),
            webCamTexture.width,
            webCamTexture.height,
            RGBLuminanceSource.BitmapFormat.RGB32
        );

        bool isValidPlayer = result != null &&
            GoogleSheetsController.ValidateId(result.Text) &&
            authController.LoadPlayer(result.Text);
        if (!isValidPlayer) return;

        StopCam();
        StartCoroutine(AccessEffect());
        audioController.hitSound();
        qrCodeTxt.text = $"BEM VINDO, {Player.Instance.Name}!!";
    }

    public void StartWebCam()
    {
        if (webCamTexture == null) webCamTexture = new WebCamTexture();
        webCamRawImg.texture = webCamTexture;
        webCamRawImg.material.mainTexture = webCamTexture;
        if (!webCamTexture.isPlaying) webCamTexture.Play();
        if (!webCamTexture.isPlaying) {
            authController.ErrorMode(
                "Webcam indisponível ou inacessável. Conecte o dispositivo"
                + " e/ou de permissão ao jogo"
            );
            return;
        }

        barcodeReader = new BarcodeReaderGeneric { AutoRotate = false };
    }

    private IEnumerator AccessEffect()
    {
        Color originalColor = qrCodeTxt.color;
        qrCodeTxt.color = ACCESS_COLOR;
        yield return new WaitForSeconds(ACCESS_EFFECT_DURATION);
        qrCodeTxt.color = originalColor;
    }

    public void StopCam()
    {
        if (webCamTexture.isPlaying) {
            barcodeReader = null;
            webCamTexture.Stop();
        }
    }
}
