import Notification from "../models/notofication.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });

    await Notification.updateMany({ to: userId }, { read: true });

    res.status(200).json(notifications);
  } catch (error) {
    console.log("error in getNotifications", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    await Notification.deleteMany({ to: userId });
    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.log("error in deleteNotifications", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteOneNotification = async (req, res) => {
  try {
    const userId = req.user._id;
    const notificationId = req.params.id;
    const notification = await Notification.findById(notificationId);

    if(!notification) {
        return res.status(404).json({ error: "notification not found" });
    }

    if(notification.to.toString() !== userId.to.toString()) {
        return res.status(403).json({ error: "you are not allowed" });
    }

    await Notification.findByIdAndDelete({ to: userId });
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.log("error in deleteOneNotification", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
