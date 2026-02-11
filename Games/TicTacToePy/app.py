import cv2

cap = cv2.VideoCapture(0)

while True:
    try:
        ret, frame = cap.read()

        if not ret:
            break

        cv2.imshow("webcam", frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    except KeyboardInterrupt:
        print("Web Cam is stopped.")
        cap.release()
        cv2.destroyAllWindows()

    except Exception as e:
        print(str(e))
        cap.release()
        cv2.destroyAllWindows()

cap.release()
cv2.destroyAllWindows()
