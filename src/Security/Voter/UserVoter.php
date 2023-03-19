<?php

namespace App\Security\Voter;

use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class UserVoter extends Voter
{
    const USER_READ   = 'user_read';
    const USER_UPDATE = 'user_update';
    const USER_DELETE = 'user_delete';

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports(string $attribute, $subject): bool
    {
        return in_array(
            $attribute,
            [
                self::USER_READ,
                self::USER_UPDATE,
                self::USER_DELETE
            ]
        )
            && $subject instanceof \App\Entity\User;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        // support() method has ensured that $subject is an User object
        /** 
         * @var User $user 
         * */
        $userSubject = $subject;

        // Check conditions and return boolean
        switch ($attribute) {
            case self::USER_READ:
                return $this->canRead($userSubject, $user);
                break;
            case self::USER_UPDATE:
                return $this->canUpdate($userSubject, $user);
                break;
            case self::USER_DELETE:
                return $this->canDelete($userSubject, $user);
                break;
        }
        return false;
    }

    /**
     * @param User $userSubject the subject of the voter
     * @param User $user the user requesting action on the subject
     * @return bool true if the user can read the subject, false otherwise
     */
    private function canRead(User $userSubject, User $user)
    {
        // All users can read their own account, with the exception of admins who can read all accounts information
        return $userSubject === $user || $this->security->isGranted('ROLE_ADMIN');
    }

    /**
     * @param User $userSubject the subject of the voter
     * @param User $user the user requesting action on the subject
     * @return bool true if the user can update the subject, false otherwise
     */
    private function canUpdate(User $userSubject, User $user)
    {
        // All users can update their own account, with the exception of admins who can update authors accounts as well
        return $userSubject === $user || ($this->security->isGranted('ROLE_ADMIN') && $userSubject->getRoles() !== ['ROLE_USER']);
    }

    /**
     * @param User $userSubject the subject of the voter
     * @param User $user the user requesting action on the subject
     * @return bool true if the user can delete the subject, false otherwise
     */
    private function canDelete(User $userSubject, User $user)
    {
        // Only members can delete their own account (not authors or admins)
        return $userSubject === $user && $userSubject->getRoles() !== ['ROLE_AUTHOR'] && $userSubject !== ['ROLE_ADMIN'];
    }
}
