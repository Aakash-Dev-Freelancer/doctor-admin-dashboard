
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, MessageSquare, Share2, MoreHorizontal, Image as ImageIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Post {
  id: number;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  date: string;
  liked: boolean;
}

const initialPosts: Post[] = [
  {
    id: 1,
    content: "Important health tip: Remember to stay hydrated! Drinking adequate water daily helps maintain your body's fluid balance, supports energy levels, and promotes overall wellbeing. #HealthTips #Hydration",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    likes: 124,
    comments: 8,
    date: "2 hours ago",
    liked: false
  },
  {
    id: 2,
    content: "Just finished an informative webinar on the latest advancements in cardiac care. Always committed to providing my patients with the most up-to-date treatment options. #ContinuingEducation #CardiacCare",
    likes: 76,
    comments: 5,
    date: "Yesterday",
    liked: true
  },
  {
    id: 3,
    content: "Proud to announce our clinic will be offering extended hours on Thursdays starting next month to better accommodate our patients' busy schedules. Your health is our priority! #PatientCare #HealthcareAccess",
    image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    likes: 209,
    comments: 23,
    date: "3 days ago",
    liked: false
  }
];

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newPost: Post = {
        id: Date.now(),
        content: newPostContent,
        image: newPostImage || undefined,
        likes: 0,
        comments: 0,
        date: "Just now",
        liked: false
      };
      
      setPosts([newPost, ...posts]);
      setNewPostContent("");
      setNewPostImage("");
      setIsLoading(false);
    }, 1000);
  };

  const handleLike = (id: number) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Social Posts</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-medical-800 hover:bg-medical-900">
              <Plus className="mr-2 h-4 w-4" /> New Post
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Textarea
                placeholder="Share a health tip, announcement, or update with your patients..."
                className="min-h-[100px]"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Add Image
                </Button>
                {newPostImage && (
                  <div className="rounded-md overflow-hidden w-16 h-16 border">
                    <img
                      src={newPostImage}
                      alt="Post preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setNewPostContent("");
                  setNewPostImage("");
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreatePost} 
                disabled={!newPostContent.trim() || isLoading}
                className="bg-medical-800 hover:bg-medical-900"
              >
                {isLoading ? "Posting..." : "Post"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-6 max-w-2xl mx-auto">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="px-4 py-3 flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">Dr. Sarah Chen</div>
                <div className="text-xs text-muted-foreground">Cardiologist • {post.date}</div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="px-4 pt-0 pb-2">
              <div className="text-sm social-post-content">
                <p className="mb-3">{post.content}</p>
                {post.image && (
                  <img 
                    src={post.image}
                    alt="Post image"
                    className="rounded-md w-full h-auto"
                  />
                )}
              </div>
            </CardContent>
            <Separator />
            <CardFooter className="px-4 py-3 flex justify-between">
              <div className="flex space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-1.5 text-muted-foreground"
                  onClick={() => handleLike(post.id)}
                >
                  <Heart className={cn(
                    "h-5 w-5", 
                    post.liked ? "fill-red-500 text-red-500" : ""
                  )} />
                  <span>{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-muted-foreground">
                  <MessageSquare className="h-5 w-5" />
                  <span>{post.comments}</span>
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Share2 className="h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Posts;
