using UnityEngine;
using UnityEngine.UI;
using System.Collections;

// Canvas of the question and answer scenes (scene 3 and quiz 2)
public abstract class QuizCanvasController : CanvasController
{
    private const float ANSWER_EFFECT_DURATION = 2f;
    private static readonly Color RIGHT_ANSWER_COLOR = new Color(0f, 1f, 0f);
    private static readonly Color WRONG_ANSWER_COLOR = new Color(1f, 0f, 0f);
    private static readonly Color DEFAULT_OUTLINE_COLOR =
        new Color(0.312f, 0.208f, 0f);
    private static readonly Color DEFAULT_IMAGE_COLOR = new Color(1f, 1f, 1f);

    // Invoked by the narrator while it is speaking
    public void activateBackgroundCover(float timeToDeactivate)
    {
        showBackgroundCover();
        this.InvokeAfter(timeToDeactivate, hideBackgroundCover);
    }

    // Highlights the outline of the button (or its image, when it has no
    // outline) in green or red for a while
    public void setAnswerEffect(Button button, bool isRightAnswer)
    {
        Color answerColor =
            isRightAnswer ? RIGHT_ANSWER_COLOR : WRONG_ANSWER_COLOR;
        Outline outline = button.GetComponent<Outline>();

        if (outline != null) {
            outline.effectColor = answerColor;
            StartCoroutine(ResetEffect(
                () => outline.effectColor = DEFAULT_OUTLINE_COLOR
            ));
        }
        else {
            Image image = button.GetComponent<Image>();
            image.color = answerColor;
            StartCoroutine(ResetEffect(
                () => image.color = DEFAULT_IMAGE_COLOR
            ));
        }
    }

    private IEnumerator ResetEffect(System.Action reset)
    {
        yield return new WaitForSeconds(ANSWER_EFFECT_DURATION);
        reset();
    }
}
