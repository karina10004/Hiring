import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Card, Button, Space } from "antd";
import { useSocket } from "../../context/SocketProvider";
import {
  CloseOutlined,
  VideoCameraOutlined,
  VideoCameraAddOutlined,
  AudioOutlined,
  AudioMutedOutlined,
} from "@ant-design/icons";
import Peer from "peerjs";

const { Title } = Typography;

const Interview = () => {
  const { interviewId, processId } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState("");
  const [remoteStream, setRemoteStream] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  useEffect(() => {
    const peerInstance = new Peer();
    setPeer(peerInstance);

    peerInstance.on("open", (id) => {
      setPeerId(id);
      const remoteSocketId = localStorage.getItem("remotePeerId");
      socket.emit("call:me", { remotePeerId: id, remoteSocketId });
    });

    peerInstance.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setLocalStream(stream);
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            setRemoteStream(remoteStream);
          });
        });
    });

    return () => {
      if (peerInstance) {
        peerInstance.destroy();
      }
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const toggleCamera = () => {
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsCameraOn(!isCameraOn);
  };

  const toggleMic = () => {
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsMicOn(!isMicOn);
  };

  const leaveCall = () => {
    peer.destroy();
    navigate(`/`);
  };

  useEffect(() => {
    const localVideo = document.getElementById("localVideo");
    const remoteVideo = document.getElementById("remoteVideo");

    if (localVideo && localStream) {
      localVideo.srcObject = localStream;
    }

    if (remoteVideo && remoteStream) {
      remoteVideo.srcObject = remoteStream;
    }
  }, [localStream, remoteStream]);

  return (
    <div style={{ padding: "20px" }}>
      <Card>
        <Title level={2}>Interview</Title>
        <div>
          <video
            id="localVideo"
            autoPlay
            muted
            style={{ width: "300px", marginRight: "10px" }}
          />
          <video id="remoteVideo" autoPlay style={{ width: "300px" }} />
        </div>
        <Space style={{ marginTop: "20px" }}>
          <Button
            type="primary"
            icon={
              isCameraOn ? <VideoCameraOutlined /> : <VideoCameraAddOutlined />
            }
            onClick={toggleCamera}
          >
            {isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
          </Button>
          <Button
            type="primary"
            icon={isMicOn ? <AudioOutlined /> : <AudioMutedOutlined />}
            onClick={toggleMic}
          >
            {isMicOn ? "Mute" : "Unmute"}
          </Button>
          <Button type="danger" icon={<CloseOutlined />} onClick={leaveCall}>
            Leave Call
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Interview;
