import fs from "node:fs";

const path = "bird.jpg_492e031e-c0d7-45cb-aa59-522c55ab3f83.jpg";

fs.unlink(path, (err) => {
  if (err) {
    console.error(err);
    return;
  }
});
