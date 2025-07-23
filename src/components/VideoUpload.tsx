import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileVideo, Sparkles, Play } from "lucide-react";

const VideoUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Upload Your Content
          </h2>
          <p className="text-lg text-muted-foreground">
            Drop your video or start with a text prompt to create viral content
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Video Upload */}
          <Card className="bg-gradient-card backdrop-blur-glass border border-white/10 p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileVideo className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Upload Video</h3>
              <p className="text-muted-foreground">
                Enhance your existing videos with trending elements
              </p>
            </div>

            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                isDragging
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto">
                    <FileVideo className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                  <Button variant="default" className="w-full">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Enhance Video
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-foreground font-medium">Drop your video here</p>
                    <p className="text-sm text-muted-foreground">
                      Or click to browse files
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload">
                    <Button variant="outline" className="cursor-pointer">
                      Choose File
                    </Button>
                  </label>
                </div>
              )}
            </div>
          </Card>

          {/* Text to Video */}
          <Card className="bg-gradient-card backdrop-blur-glass border border-white/10 p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Text to Video</h3>
              <p className="text-muted-foreground">
                Create videos from scratch using AI and trending elements
              </p>
            </div>

            <div className="space-y-4">
              <textarea
                placeholder="Describe the video you want to create..."
                className="w-full h-32 p-4 bg-input border border-border rounded-xl resize-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
              />
              <Button variant="default" className="w-full">
                <Play className="w-4 h-4 mr-2" />
                Generate Video
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;