using System;
using System.Collections.Generic;
using System.Reflection;
using NUnit.Framework;
using UnityEditor;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class DragAndDropTests
{
    private readonly List<GameObject> objects = new List<GameObject>();
    private MonoBehaviour item;
    private CanvasGroup group;
    private RectTransform rect;
    private PointerEventData pointer;
    private readonly Vector2 origin = new Vector2(12f, 24f);

    [TearDown]
    public void TearDown()
    {
        foreach (GameObject obj in objects)
            UnityEngine.Object.DestroyImmediate(obj);
        objects.Clear();
    }

    [TestCase("DragAndDrop")]
    [TestCase("DragAndDrop2")]
    [TestCase("DragAndDrop3")]
    public void RejectedDropRestoresPositionAndRaycasts(string typeName)
    {
        CreateItem(typeName);
        ((IBeginDragHandler)item).OnBeginDrag(pointer);
        Assert.That(group.blocksRaycasts, Is.False);
        ((IDragHandler)item).OnDrag(pointer);
        ((IEndDragHandler)item).OnEndDrag(pointer);

        Assert.That(rect.anchoredPosition, Is.EqualTo(origin));
        Assert.That(group.blocksRaycasts, Is.True);
        Assert.That(group.interactable, Is.True);
    }

    [TestCase("DragAndDrop")]
    [TestCase("DragAndDrop2")]
    [TestCase("DragAndDrop3")]
    public void AcceptedDropKeepsPositionAndDisablesInteraction(string typeName)
    {
        CreateItem(typeName);
        ((IBeginDragHandler)item).OnBeginDrag(pointer);
        ((IDragHandler)item).OnDrag(pointer);
        Vector2 droppedPosition = rect.anchoredPosition;
        item.GetType().GetField("correct").SetValue(item, true);
        ((IEndDragHandler)item).OnEndDrag(pointer);

        Assert.That(rect.anchoredPosition, Is.EqualTo(droppedPosition));
        Assert.That(group.interactable, Is.False);
        Assert.That(group.blocksRaycasts, Is.False);
        if (typeName == "DragAndDrop3")
            Assert.That(item.GetComponentInParent<Button>().interactable, Is.False);
    }

    [TestCase("DragAndDrop")]
    [TestCase("DragAndDrop2")]
    [TestCase("DragAndDrop3")]
    public void DragAccountsForCanvasScale(string typeName)
    {
        CreateItem(typeName);
        ((IDragHandler)item).OnDrag(pointer);
        Assert.That(rect.anchoredPosition, Is.EqualTo(origin + pointer.delta / 2f));
    }

    [TestCase(false)]
    [TestCase(true)]
    public void ResizedItemRestoresSizeOnlyWhenRejected(bool accepted)
    {
        CreateItem("DragAndDrop2");
        Vector2 originalSize = rect.sizeDelta;
        ((IBeginDragHandler)item).OnBeginDrag(pointer);
        Assert.That(rect.sizeDelta, Is.EqualTo(new Vector2(70f, 80f)));
        item.GetType().GetField("correct").SetValue(item, accepted);
        ((IEndDragHandler)item).OnEndDrag(pointer);
        Assert.That(rect.sizeDelta, Is.EqualTo(accepted ? new Vector2(70f, 80f) : originalSize));
    }

    [Test]
    public void ConnectionLineUsesPointerWorldPositionsInTheXYPlane()
    {
        CreateItem("DragAndDrop3");
        ((IBeginDragHandler)item).OnBeginDrag(pointer);
        LineRenderer line = item.GetComponent<LineRenderer>();
        Assert.That(line.positionCount, Is.EqualTo(1));
        Assert.That(line.GetPosition(0), Is.EqualTo(new Vector3(3f, 4f, 0f)));

        pointer.pointerCurrentRaycast = new RaycastResult { worldPosition = new Vector3(5f, 6f, 9f) };
        ((IDragHandler)item).OnDrag(pointer);
        Assert.That(line.positionCount, Is.EqualTo(2));
        Assert.That(line.GetPosition(1), Is.EqualTo(new Vector3(5f, 6f, 0f)));
    }

    private void CreateItem(string typeName)
    {
        var canvas = NewObject("Canvas", typeof(Canvas)).GetComponent<Canvas>();
        canvas.scaleFactor = 2f;
        var parent = NewObject("Parent", typeof(RectTransform), typeof(Button));
        var obj = NewObject("Item", typeof(RectTransform), typeof(CanvasGroup), typeof(LineRenderer));
        obj.transform.SetParent(parent.transform, false);
        rect = obj.GetComponent<RectTransform>();
        rect.anchoredPosition = origin;
        rect.sizeDelta = new Vector2(30f, 40f);
        group = obj.GetComponent<CanvasGroup>();
        item = (MonoBehaviour)obj.AddComponent(Type.GetType(typeName + ", Assembly-CSharp", true));

        var audio = NewObject("Audio", typeof(AudioSource));
        var controller = audio.AddComponent(Type.GetType("AudioController, Assembly-CSharp", true));
        AssignObject(controller, "buttonClickedAudio", audio.GetComponent<AudioSource>());
        // SerializedObject also verifies that inherited fields retain their serialized names.
        AssignObject(item, "audioController", controller);
        AssignObject(item, "canvas", canvas);
        if (typeName == "DragAndDrop2")
        {
            var slot = NewObject("Slot", typeof(RectTransform)).GetComponent<RectTransform>();
            slot.sizeDelta = new Vector2(70f, 80f);
            AssignObject(item, "slotSize", slot);
        }
        item.GetType().GetMethod("Awake", BindingFlags.Instance | BindingFlags.NonPublic).Invoke(item, null);
        pointer = new PointerEventData(null)
        {
            delta = new Vector2(10f, 20f),
            pointerCurrentRaycast = new RaycastResult { worldPosition = new Vector3(3f, 4f, 8f) }
        };
    }

    private GameObject NewObject(string name, params Type[] components)
    {
        var obj = new GameObject(name, components);
        objects.Insert(0, obj);
        return obj;
    }

    private static void AssignObject(UnityEngine.Object target, string name, UnityEngine.Object value)
    {
        var serialized = new SerializedObject(target);
        SerializedProperty property = serialized.FindProperty(name);
        Assert.That(property, Is.Not.Null, "Missing serialized field: " + name);
        property.objectReferenceValue = value;
        serialized.ApplyModifiedPropertiesWithoutUndo();
    }
}
