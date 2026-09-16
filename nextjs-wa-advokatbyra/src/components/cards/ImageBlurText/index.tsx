export type ImageBlurProps = {
  src?: string,
  eyebrow?: string,
  title?: string,
}

const ImageBlurText = ({
  src,
  eyebrow,
  title,
}: ImageBlurProps) => {
  return (
    <div
      style={{
        backgroundImage: src
          ? `url("${src}")`
          : undefined,
      }}
      className="min-h-72 w-full bg-cover bg-center"
    >
      <div className="flex min-h-72 flex-col items-start justify-end gap-sm bg-linear-to-t from-black/60 via-black/10 to-transparent p-lg text-white">
        <p className="font-eyebrow text-white">
          {eyebrow}
        </p>

        <h2 className="font-heading text-white">
          {title}
        </h2>
      </div>
    </div>
  );
}

export default ImageBlurText