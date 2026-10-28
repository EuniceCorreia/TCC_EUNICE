using System.Collections;
using UnityEngine;
using UnityEngine.UI;

internal static class AnswerFeedback
{
    public static IEnumerator Play(Button button, bool isRightAnswer)
    {
        Color answerColor = isRightAnswer ? new Color(0f, 1f, 0f) : new Color(1f, 0f, 0f);
        Outline outline = button.gameObject.GetComponent<Outline>();

        if(outline != null)
        {
            outline.effectColor = answerColor;
            return ResetOutline(outline);
        }
        else
        {
            Image image = button.gameObject.GetComponent<Image>();
            image.color = answerColor;
            return ResetImage(image);
        }
    }

    private static IEnumerator ResetOutline(Outline outline)
    {
        yield return new WaitForSeconds(2f);
        outline.effectColor = new Color(0.312f, 0.208f, 0f);
    }

    private static IEnumerator ResetImage(Image image)
    {
        yield return new WaitForSeconds(2f);
        image.color = new Color(1f, 1f, 1f);
    }
}
