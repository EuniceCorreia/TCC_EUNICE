using UnityEngine;
using UnityEngine.UI;

// Turns green or red according to the answer and accepts no other drop
public class slot4 : DropSlot
{
    private static readonly Color32 RIGHT_COLOR = new Color32(80, 255, 80, 180);
    private static readonly Color32 WRONG_COLOR = new Color32(255, 80, 80, 180);

    protected override void onCorrectDrop(GameObject item)
    {
        disableWithColor(RIGHT_COLOR);
    }

    protected override void onWrongDrop()
    {
        disableWithColor(WRONG_COLOR);
    }

    private void disableWithColor(Color color)
    {
        Button button = GetComponent<Button>();
        ColorBlock colors = button.colors;

        colors.disabledColor = color;
        button.interactable = false;
        button.colors = colors;
    }
}
