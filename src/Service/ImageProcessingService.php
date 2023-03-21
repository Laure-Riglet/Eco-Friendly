<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\File;

class ImageProcessingService
{
    public function processImage(File $imageFile, string $fileType)
    {
        $extension = $imageFile->guessExtension();
        if (!in_array($extension, ['jpg', 'jpeg', 'png'])) {
            return $this->addFlash('danger', 'Format d\'image non supporté');
        }

        if ($fileType === 'user') {
            $this->processUserImage($imageFile);
        }

        if ($fileType === 'article') {
            $this->processArticleImage($imageFile);
        }
    }

    private function processUserImage(File $imageFile)
    {
        // Set the filename
        $filename = uniqid() . '.' . $imageFile->guessExtension();
        $filepath = $this->getParameter('uploads_user_directory') . '/' . $filename;

        try {
            $imageFile->move(
                $this->getParameter('uploads_user_directory'),
                $filename
            );
        } catch (FileException $e) {
            $this->addFlash('danger', 'Une erreur est survenue lors de l\'upload de l\'image');
        }

        list($width, $height) = getimagesize($filepath);
        $size = min($width, $height); // get the minimum dimension
        $dst_x = ($width - $size) / 2;
        $dst_y = ($height - $size) / 2;
        $src_x = 0;
        $src_y = 0;
        $new_width = $new_height = 80;

        if ($extension === 'png') {
            $image = imagecreatefrompng($filepath);
        } else {
            $image = imagecreatefromjpeg($filepath);
        }

        $new_image = imagecreatetruecolor($new_width, $new_height);
        imagecopyresampled($new_image, $image, 0, 0, $src_x + $dst_x, $src_y + $dst_y, $new_width, $new_height, $size, $size);

        if ($extension === 'png') {
            imagepng($new_image, $filepath);
        } else {
            imagejpeg($new_image, $filepath);
        }

        imagedestroy($image);
        imagedestroy($new_image);

        $user->setAvatar($this->getParameter('uploads_user_url') . $filename);
    }
}
