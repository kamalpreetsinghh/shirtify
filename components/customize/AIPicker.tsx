import { IAIPicker } from "@/lib/types";

const AIPicker = ({
  prompt,
  setPrompt,
  generatingImg,
  handleSubmit,
}: IAIPicker) => {
  return (
    <div className="aipicker-container">
      <textarea
        placeholder="Ask AI..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="aipicker-textarea"
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <button>Asking AI...</button>
        ) : (
          <>
            <button
              className="rounded-button bg-primary"
              onClick={handleSubmit}
            >
              AI Logo
            </button>
            <button
              className="rounded-button bg-primary"
              onClick={handleSubmit}
            >
              AI Full
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AIPicker;
