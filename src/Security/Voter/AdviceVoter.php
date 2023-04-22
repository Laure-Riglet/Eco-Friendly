<?php

namespace App\Security\Voter;

use App\Entity\Advice;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class AdviceVoter extends Voter
{
    const ADVICE_READ       = 'advice_read';
    const ADVICE_EDIT       = 'advice_edit';
    const ADVICE_DELETE     = 'advice_delete';

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
                self::ADVICE_READ,
                self::ADVICE_EDIT,
                self::ADVICE_DELETE
            ]
        )
            && $subject instanceof \App\Entity\Advice;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        // support() method has ensured that $subject is an Advice object
        /** 
         * @var Advice $advice 
         * */
        $advice = $subject;

        // Check conditions and return boolean
        switch ($attribute) {
            case self::ADVICE_READ:
                return $this->canRead($advice, $user);
                break;
            case self::ADVICE_EDIT:
                return $this->canEdit($advice, $user);
                break;
            case self::ADVICE_DELETE:
                return $this->canDelete($advice, $user);
                break;
        }
        return false;
    }

    /**
     * @param Advice $advice the subject of the voter
     * @return bool true if the user can read the advice, false otherwise
     */
    private function canRead(Advice $advice)
    {
        return $advice->getStatus() !== 0;
    }

    /**
     * @param Advice $advice the subject of the voter
     * @param User $user the user requesting action on the subject
     * @return bool true if the user can edit the advice, false otherwise
     */
    private function canEdit(Advice $advice, User $user)
    {
        return ($user === $advice->getContributor() && $advice->getStatus() !== 2)
            || $this->security->isGranted('ROLE_ADMIN');
    }

    /**
     * @param Advice $advice the subject of the voter
     * @param User $user the user requesting action on the subject
     * @return bool true if the user can delete the advice, false otherwise
     */
    private function canDelete(Advice $advice, User $user)
    {
        return ($user === $advice->getContributor() && $advice->getStatus() !== 2);
    }
}
