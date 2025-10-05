import { setup } from "goober";
import { createElement } from "react";

setup(createElement);

/**
 * Components
 */
export { Card } from "./components/Card";
export { Button } from "./components/Button";
export { Toggle } from "./components/Toggle";
export { Modal } from "./components/Modal";

/**
 * Components types
 */
export type { CardProps } from "./components/Card";
export type { ButtonProps } from "./components/Button";
export type { ToggleProps } from "./components/Toggle";
export type { ModalProps } from "./components/Modal";
