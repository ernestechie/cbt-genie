import React from "react";
import { Button } from "./ui/button";

export default function ButtonDisplay() {
  return (
    <div className="flex flex-col gap-y-4">
      <Button block type="submit" loading>
        Block Button
      </Button>
      <Button type="submit" size="large">
        Large Button
      </Button>
      <Button type="submit" size="small" variant="secondary" rounded>
        Small Button
      </Button>

      <div className="flex items-center gap-3">
        <Button type="submit" size="icon">
          <i className="pi pi-plus" />
        </Button>
        <Button type="submit" size="icon" variant="secondary">
          <i className="pi pi-pen-to-square" />
        </Button>
        <Button type="submit" size="icon" variant="destructive">
          <i className="pi pi-trash" />
        </Button>
      </div>
    </div>
  );
}
