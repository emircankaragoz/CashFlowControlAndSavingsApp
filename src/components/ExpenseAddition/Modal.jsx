import React, { useState } from "react";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ExpenseForm } from "@/components";

export default function ModalComponent({ title, session }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {title}
    </Tooltip>
  );

  return (
    <div>
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <Button
          variant="dark"
          style={{ backgroundColor: "#3F3D56;" }}
          onClick={handleShow}
        >
          <i className="bi bi-plus-lg"></i>
        </Button>
      </OverlayTrigger>

      <Modal centered show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton />
        <Modal.Body>
          <ExpenseForm session={session} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
